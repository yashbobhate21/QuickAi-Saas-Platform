import { clerkClient } from "@clerk/express";
import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import Pdf from 'pdf-parse/lib/pdf-parse.js';

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async(req,res) => {
   try {
     const {userId} = req.auth();
     const {prompt,length} = req.body;
     const plan = req.plan;
     const free_usage = req.free_usage;

     if(plan !== 'Premium' && free_usage >= 10) {
        return res.json({success: false, message: 'Free usage limit exceeded. Upgrade to Premium for more requests.'});
     }

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: length,
});

    const content = response.choices[0].message.content;

    await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${content},'article')`;

    if(plan !== 'Premium') {
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage: free_usage + 1
            }
        });
    }
    res.json({success: true, content});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}

export const generateBlogTitle = async(req,res) => {
   try {
     const {userId} = req.auth();
     const {prompt} = req.body;
     const plan = req.plan;
     const free_usage = req.free_usage;

     if(plan !== 'Premium' && free_usage >= 10) {
        return res.json({success: false, message: 'Free usage limit exceeded. Upgrade to Premium for more requests.'});
     }

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 100,
});

    const content = response.choices[0].message.content;

    await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${content},'blog-title')`;

    if(plan !== 'Premium') {
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage: free_usage + 1
            }
        });
    }
    res.json({success: true, content});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}
export const generateImage = async(req,res) => {
   try {
     const {userId} = req.auth();
     const {prompt,publish} = req.body;
     const plan = req.plan;

    console.log('User plan:', plan);

     if(plan !== 'Premium') {
        return res.json({success: false, message: 'Upgrade to Premium for image generation.'});
     }

    const formData = new FormData()
    formData.append('prompt', prompt)
    const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
        headers:{
            'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
    })

    const base64Image = `data:image/png;base64, ${Buffer.from(data,'binary').toString('base64')}`;

    const {secure_url} = await cloudinary.uploader.upload(base64Image)

    await sql `INSERT INTO creations(user_id,prompt,content,type,publish) VALUES(${userId},${prompt},${secure_url},'image',${publish ?? false})`;

    res.json({success: true, content:secure_url});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}
export const RemoveImageBackground = async(req,res) => {
   try {
     const {userId} = req.auth();
     const {image} = req.file;
     const plan = req.plan;

     if(plan !== 'Premium') {
        return res.json({success: false, message: 'Upgrade to Premium for image generation.'});
     }

    

    const {secure_url} = await cloudinary.uploader.upload(image.path,{
        transformation:[
            {
                effect:'background_removal',
                background_removal: 'remove_the_background'
            }
        ]
    });

    await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},'remove background from image',${secure_url},'image')`;

    res.json({success: true, content:secure_url});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}
export const RemoveImageObject = async(req,res) => {
   try {
     const {userId} = req.auth();
     const {object} = req.body;
     const {image} = req.file;
     const plan = req.plan;

     if(plan !== 'Premium') {
        return res.json({success: false, message: 'Upgrade to Premium for image generation.'});
     }

    const {public_id} = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id,{
        transformation:[{effect : `gen_remove:${object}`}],
        resource_type:'image'
    })

    await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${`removed ${object} from image`},${imageUrl},'image')`;

    res.json({success: true, content:imageUrl});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}
export const ResumeReview = async(req,res) => {
   try {
     const {userId} = req.auth();
     const resume = req.file;
     const plan = req.plan;

     if(plan !== 'Premium') {
        return res.json({success: false, message: 'Upgrade to Premium for image generation.'});
     }

    if(resume > 5 * 1024 * 1024) {
        return res.json({success: false, message: 'File size exceeds 5MB limit.'});
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await Pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

    const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 1000,
});

    const content = response.choices[0].message.content;

    await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},'review the uploaded resume',${content},'resume-review')`;

    res.json({success: true, content});

   } catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message});
   }
}