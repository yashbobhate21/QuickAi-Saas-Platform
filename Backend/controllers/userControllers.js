import sql from "../configs/db.js";

export const getUserCreations = async(res,req) => {
    try {
        const {userId} = req.auth();
        const creations = await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.json({success:true,message:creations})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const toggleLikeCreation = async(res,req) => {
    try {
        const {userId} = req.auth();
        const {id} = req.body;

        const [creation] = await sql `SELECT * FROM creations WHERE id = ${id}`

        if(!creation){
            return res.json({success:false,message:"creation not found"})
        }

        const currentLikes = creation.likes
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes (userIdStr)) {
        updatedLikes = currentLikes.filter((user)=>user !== userIdStr);
        message = 'Creation Unliked'
        }else{
            updatedLikes = [...currentLikes,userIdStr]
            message = 'Creation liked'
        }

        const formattedArray = `{${updatedLikes.json(',')}}`

        await sql `UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;


        res.json({success:true,message:message})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}