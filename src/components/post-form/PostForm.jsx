import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, SelectBox } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });


  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState(null);

  const submit = async (data) => {
    setError(null);
    try { // Wrapped entire function in try-catch for better error handling
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0]) // Ensure proper async handling
          : null;
        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage); // Ensure proper async handling
        }
        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage, // Updated to use post.featuredImage if no new file
        });
        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0]) // Ensure proper async handling
          : null;
        const newPost = await appwriteService.createPost({
          ...data,
          featuredImage: file ? file.$id : undefined, // Updated to handle featuredImage correctly
          userId: userData.$id,
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (error) {
      setError(error.message); // Added for error handling
    }
  };
  
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectBox
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
