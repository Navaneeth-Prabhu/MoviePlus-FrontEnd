import { Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadWidget from "./UploadWidget";

const Gener = [
  "Action",
  "Romance",
  "Dramas",
  "Thriller",
  "Horror",
  "Sci-fi",
  "Fantasy",
];
const Language = ["English", "Hindi", "Tamil", "Malayalam", "Kannada"];



function EditMovieModel({ editModel, movie, seteditModel, handleSave }) {
  // const { register, handleSubmit, setValue } = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
 

  // Populate form fields with existing movie data
  const [selectedGener, setSelectedGener] = useState([]);
  setValue("title", movie?.title);
  setValue("description", movie?.description);
  setValue("director", movie?.director);
  setValue("Genre", movie?.Genre?.join(", "));
  setValue("Language", movie?.Language?.join(", "));
  // setValue('posterImg', movie?.posterImg);
  setValue("youtubeLink", movie?.youtubeLink);
  const [gener, setgener] = useState([]);
  const [language, setlanguage] = useState([]);
  const [error, updateError] = useState();
  const [url, seturl] = useState()
  
  const onSubmit = async (data) => {
    const genreArray = data.Genre.split(",").map((s) => s.trim());
    const LanguageArray = data.Language.split(",").map((s) => s.trim());
    const updatedData = { ...data, Genre: genreArray ,Language:LanguageArray,PosterImg:url};

    handleSave(updatedData);
  };
  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    seturl(result?.info?.secure_url);
  }


  return (
    <>
      {editModel && (
        <div className="fixed left-50 right-50 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">
          <div className="relative w-full h-full max-w-2xl px-4  m-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold dark:text-white">
                  Add new user
                </h3>
                <button
                  type="button"
                  onClick={() => seteditModel(!editModel)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("title", { required: true })}
                        defaultValue={movie.title}
                        required
                      />
                      {errors.title && <span>This field is required</span>}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        description
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("description", { required: true })}
                        defaultValue={movie.description}
                        required
                      />
                      {errors.description && (
                        <span>This field is required</span>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        director
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("director", { required: true })}
                        defaultValue={movie.director}
                        required
                      />
                      {errors.director && <span>This field is required</span>}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Genre
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("Genre", { required: true })}
                        defaultValue={movie.Genre}
                        required
                      />
                      {errors.description && (
                        <span>This field is required</span>
                      )}
                    </div>

              
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Language
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("Language", { required: true })}
                        defaultValue={movie.Language}
                        required
                      />
                      {errors.description && (
                        <span>This field is required</span>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        youtubeLink
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        {...register("youtubeLink", { required: true })}
                        defaultValue={movie.youtubeLink}
                        required
                      />
                      {errors.description && (
                        <span>This field is required</span>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image Upload
                      </label>
                      <div className="container">
              
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button className="bg-blue-900 px-4 py-2 rounded-md" onClick={handleOnClick}>Upload an Image</button>
                      );
                    }}
                  </UploadWidget>

                  {error && <p>{error}</p>}

                  {url && (
                    <>
                      <p>
                        <img className="w-20 h-full mt-4" src={url} alt="Uploaded image" />
                      </p>
                      <p>{url}</p>
                    </>
                  )}
                </div>
                    </div>
                    
                  
                  </div>

                  <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button
                      className="text-white bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="submit"
                      id="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditMovieModel;
