import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload as PrimeFileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import axios from "axios";
import FileAnalysisResult from "./FileAnalysisResult"; // Import the result component

export default function FileUpload() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onTemplateSelect = (e) => {
    let _totalSize = 0;
    let file = e.files[0];

    if (file.type === "application/pdf") {
      setSelectedFile(file);
      _totalSize = file.size;
      setTotalSize(_totalSize);
    } else {
      setError("Only PDF files are allowed.");
      setSelectedFile(null);
      setTotalSize(0);
    }
  };

  const onTemplateClear = () => {
    setSelectedFile(null);
    setTotalSize(0);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file to analyze.");
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/file/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data.data); // Update the result with server response
      toast.current.show({
        severity: "success",
        summary: "File Uploaded",
        detail: "Analysis complete!",
      });
    } catch (err) {
      setError("Failed to analyze the file. Please try again.");
      console.error(err);
    }
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;

    const formattedValue =
      totalSize > 0 ? `${(totalSize / 1024).toFixed(2)} KB` : "0 KB";

    const progressValue = Math.min((totalSize / 1000000) * 100, 100);

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / 1 MB</span>
          <ProgressBar
            value={progressValue}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <i
            className="pi pi-file-pdf"
            style={{ fontSize: "2rem", color: "red" }}
          ></i>
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={`${(file.size / 1024).toFixed(2)} KB`}
          severity="warning"
          className="px-3 py-2"
        />
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <PrimeFileUpload
        name="demo[]"
        accept="application/pdf"
        maxFileSize={1000000}
        customUpload
        onSelect={onTemplateSelect}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={() => (
          <div className="flex align-items-center flex-column">
            <i
              className="pi pi-file-pdf mt-3 p-5"
              style={{
                fontSize: "5em",
                borderRadius: "50%",
                backgroundColor: "var(--surface-b)",
                color: "var(--surface-d)",
              }}
            ></i>
            <span
              style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
              className="my-5"
            >
              Drag and Drop PDF File Here
            </span>
          </div>
        )}
      />

      <Button
        label="Analyze File"
        icon="pi pi-search"
        onClick={handleAnalyze}
        disabled={!selectedFile}
        className="p-button-primary mt-3"
      />

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <FileAnalysisResult result={result} /> {/* Use the updated result component */}
        </div>
      )}
    </div>
  );
}
