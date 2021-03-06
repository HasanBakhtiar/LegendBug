import database from '../firebase/firebaseConfig'
// Action creator
export const addBlog = (blog)=>({
    type: "ADD_BLOG",
    blog
});
export const addBlogToDatabase =(blogData={})=>{
return (dispatch)=>{
    const {title='', description='', dataAdded=0} = blogData;
    const blog = {title,description,dataAdded};
    database.ref("blogs").push(blog).then((res)=>{
        dispatch(addBlog({
            id:res.key,
            ...blog
        }))
    })
}
}

export const removeBlog = ({id})=>(
    {
        type:"REMOVE_BLOG",
        id: id
    }
)

export const editBlog = (id,updates) => ({
type: "EDIT_BLOG",
id,
updates
})
export const setBlogs =(blogs)=>({
    type: "SET_BLOGS",
    blogs
});

export const getBlogsFromDatabase=()=>{
    return(dispatch)=>{
        return database.ref("blogs").once("value").then((snapshot)=>{
            const blogs =[];

            snapshot.forEach((blog)=>{
                blogs.push({
                    id: blog.key,
                    ...blog.val()
                })
            })
            dispatch(setBlogs(blogs))
        })
    }
}
