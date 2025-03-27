import { useState } from "react";
import styles from "./Form.module.css";
import FormGroup from "../auth/FormGroup";
import { useToast } from "../../context/ToastContext";
import { useImages } from "../../context/ImageContext";
import { surpriseMePrompts } from "../../constants/suppriceMe";

function Form() {
  const [imageTitle, setImageTitle] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageTags, setImageTags] = useState("");

  const { addToast } = useToast();
  const { generateImage, status, publishImage } = useImages();

  const handleTitleChange = (e) => setImageTitle(e.target.value);
  const handlePromptChange = (e) => setImagePrompt(e.target.value);
  const handleTagsChange = (e) => setImageTags(e.target.value);
  const handleSuppriseMe = (e) => {
    e.preventDefault();
    const randomPrompt = surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)] || "";
    setImagePrompt(randomPrompt);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await publishImage(imageTitle, imageTags);
  }
  async function handleGenerate(e) {
    e.preventDefault();
    if (!imagePrompt) return addToast("image prompt is required 🤦‍♂️", "error");

    await generateImage(imagePrompt);
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create New AI Image</h1>
        <p className={styles.welcomeMessage}>
          Generate a new AI image by providing the necessary details below. 🎨
        </p>
        <FormGroup
          type="text"
          id="imageTitle"
          placeholder="Enter image title"
          value={imageTitle}
          onChange={handleTitleChange}
        />
        <div className={styles.promptContainer}>
          <FormGroup
            type="text"
            id="imagePrompt"
            placeholder="Enter image prompt"
            value={imagePrompt}
            onChange={handlePromptChange}
          />
          <button className={styles.supprise} onClick={handleSuppriseMe}>🪄</button>
          <button
            disabled={status === "generating"}
            className={styles.generateButton}
            onClick={handleGenerate}
          >
            {status === "generating" ? "..." : "Generate"}
          </button>
        </div>
        <FormGroup
          type="text"
          id="imageTags"
          placeholder="Enter image tags (split theme with ,)"
          value={imageTags}
          onChange={handleTagsChange}
        />
        <button
          type="submit"
          className="btn actionButton"
          style={{ margin: "0" }}
          disabled={status === "publishing"}
        >
          {status === "publishing" ? "publishing ... " : "Publish the Image"}
        </button>
      </form>
    </div>
  );
}

export default Form;
