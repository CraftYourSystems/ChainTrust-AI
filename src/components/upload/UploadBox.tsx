'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

interface UploadBoxProps {
  onUpload: (file: File) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    ];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    const isValidExtension = ['pdf', 'docx'].includes(fileExtension || '');

    if (!validTypes.includes(selectedFile.type) && !isValidExtension) {
      setError('Unsupported file type. Please upload a searchable PDF or DOCX file.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
        className={`relative p-8 border-2 border-dashed rounded-2xl transition-all ${
          dragActive 
            ? 'border-brand-primary bg-blue-50/50' 
            : file 
              ? 'border-slate-300 bg-slate-50/50' 
              : 'border-slate-200 hover:border-slate-300 bg-white'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center justify-center text-center">
          {!file ? (
            <>
              <div className="p-4 bg-slate-50 rounded-full mb-4">
                <Upload className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Upload your contract
              </h3>
              <p className="text-sm text-slate-500 mb-4 max-w-sm">
                Drag and drop your PDF or DOCX file here, or click to browse.
              </p>
              <Button type="button" variant="outline" onClick={onButtonClick}>
                Browse Files
              </Button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-brand-primary rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 truncate max-w-md">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-brand-danger text-sm bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {file && (
            <div className="mt-6 w-full">
              <Button
                type="button"
                className="w-full"
                onClick={handleSubmit}
              >
                Generate Due Diligence Report
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
