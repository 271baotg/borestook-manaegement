import React from "react";
import { DialogHTMLAttributes, useEffect, useState } from "react";
import { Console, error } from "console";
import BookModel from "../../../models/BookModel";
import { title } from "process";
import axios, { AxiosInstance } from "axios";

interface componentProps {
  axios: AxiosInstance;
}
export const AddBook: React.FC<componentProps> = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    available: 1,
    category: "",
    img: "",
    price: 0,
  });

  useEffect(() => {
    console.log("Book state: " + JSON.stringify(book));
  }, [book]);

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const response = await props.axios.post(
          "http://localhost:8081/cloudinary/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        return response.data;
      } else {
        console.error("No file selected.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCategorySelect = (category: any) => {
    setBook({ ...book, category });
    setSelectedCategory(category);
  };

  const handleInput = (event: any) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  async function base64ConversionForImages(e: any) {
    if (e.target && e.target.file && e.target.file[0]) {
      getBase64(e.target.file[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      handleInput({
        target: {
          name: "img",
          value: reader.result,
        },
      });
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }

  const submitBook = async () => {
    try {
      var formData = new FormData();
      formData.append("image", selectedFile!);
      formData.append(
        "bookData",
        new Blob([JSON.stringify(book)], { type: "application/json" })
      );
      const response: BookModel = await props.axios({
        method: "post",
        data: formData,
        url: "http://localhost:8081/books/save",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      console.log("Save Book: " + JSON.stringify(response));
      setDisplaySuccess(true);
    } catch (error) {
      console.log(error);
      setDisplayWarning(true);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Book added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a new book</div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label className="form-label">Category</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCategory || "Select Category"}
                </button>

                <ul id="addNewBookId" className="dropdown-menu">
                  <li>
                    <a
                      onClick={() => handleCategorySelect("Front End")}
                      className="dropdown-item"
                    >
                      Front End
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleCategorySelect("Back End")}
                      className="dropdown-item"
                    >
                      Back End
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleCategorySelect("Data")}
                      className="dropdown-item"
                    >
                      Data
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => handleCategorySelect("DevOps")}
                      className="dropdown-item"
                    >
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 mb-3">
                <label className="form-label">Avalable</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  defaultValue={1}
                  name="available"
                  required
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  defaultValue={0}
                  name="price"
                  required
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                cols={50}
                rows={5}
                name="description"
                required
                onChange={handleInput}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <input type="file" onChange={(e) => handleFileChange(e)} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitBook}
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
