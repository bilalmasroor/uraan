import { useEffect, useState } from "react";
import { X, Upload, FileText } from "lucide-react";

declare global {
  interface Window {
    openEnhancedContactModal?: () => void;
  }
}

interface FormData {
  name: string;
  email: string;
  contact: string;
  attachment: File | null;
}

interface FormErrors {
  name?: string;  
  email?: string;
  contact?: string;
  attachment?: string;
  
}

export default function EnhancedContactModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({ 
    name: "", 
    email: "", 
    contact: "", 
    attachment: null 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [dragActive, setDragActive] = useState(false);

  // Expose global opener
  useEffect(() => {
    window.openEnhancedContactModal = () => setOpen(true);
    return () => {
      if (window.openEnhancedContactModal) delete window.openEnhancedContactModal;
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Validation functions
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isContactValid = (contact: string) => {
    const contactRegex = /^[\d\s\-\+\(\)]+$/;
    return contactRegex.test(contact) && contact.replace(/\D/g, '').length >= 10;
  };

  const isFileValid = (file: File) => {
    const allowedTypes = [
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  
      // Videos
      'video/mp4',
      'video/quicktime',   // .mov
      'video/x-msvideo',   // .avi
      'video/x-matroska',  // .mkv
      'video/webm',
    ];
  
    console.log("File type:", file.type); // <- helps debug browser MIME type
    return allowedTypes.includes(file.type);
  };
    

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Live validation
    if (name === "email") {
      setErrors(prev => ({
        ...prev,
        email: value && !isEmailValid(value) ? "Please enter a valid email address" : undefined,
      }));
    }
    if (name === "contact") {
      setErrors(prev => ({
        ...prev,
        contact: value && !isContactValid(value) ? "Please enter a valid contact number" : undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isFileValid(file)) {
        setForm(prev => ({ ...prev, attachment: file }));
        setErrors(prev => ({ ...prev, attachment: undefined }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          attachment: "Please upload a PDF, Word, Excel, or PowerPoint file" 
        }));
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (isFileValid(file)) {
        setForm(prev => ({ ...prev, attachment: file }));
        setErrors(prev => ({ ...prev, attachment: undefined }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          attachment: "Please upload a PDF, Word, Excel, or PowerPoint file" 
        }));
      }
    }
  };

  const removeFile = () => {
    setForm(prev => ({ ...prev, attachment: null }));
    setErrors(prev => ({ ...prev, attachment: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const submitErrors: FormErrors = {};
    if (!form.name.trim()) submitErrors.name = "Name is required";
    if (!isEmailValid(form.email)) submitErrors.email = "Please enter a valid email address";
    if (!isContactValid(form.contact)) submitErrors.contact = "Please enter a valid contact number";
  
    if (Object.keys(submitErrors).length) {
      setErrors(submitErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      let uploadedUrl = "";
  
      // 1️⃣ Upload file/video to Cloudinary
      if (form.attachment) {
        const cloudData = new FormData();
        cloudData.append("file", form.attachment);
        cloudData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        cloudData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: cloudData,
          }
        );
  
        const uploadResult = await uploadResponse.json();
        if (!uploadResult.secure_url) throw new Error("Upload failed");
        uploadedUrl = uploadResult.secure_url;
      }
  
      // 2️⃣ Send data to Web3Forms (include Cloudinary URL)
      const formData = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        name: form.name,
        email: form.email,
        contact: form.contact,
        subject: "New Enhanced Contact Form Submission",
        message: `Name: ${form.name}\nEmail: ${form.email}\nContact: ${form.contact}\n\n${
          uploadedUrl
            ? `Attachment: ${uploadedUrl}`
            : "No file uploaded."
        }`,
      };
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("✅ Thank you for your submission! We'll get back to you soon.");
        setForm({ name: "", email: "", contact: "", attachment: null });
        setErrors({});
        setOpen(false);
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const closeModal = () => {
    setOpen(false);
    setForm({ name: "", email: "", contact: "", attachment: null });
    setErrors({});
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full max-w-[380px] mx-4 p-4 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-black mb-1">Get in Touch</h2>
              <p className="text-gray-600 text-xs">We'd love to hear from you</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-[#FC4C00] focus:border-[#FC4C00] outline-none transition-all font-roboto text-[14px]"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email Address *"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-2.5 rounded-md outline-none transition-all font-roboto text-[14px] ${
                    errors.email 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 border" 
                      : "border border-gray-300 focus:ring-2 focus:ring-[#FC4C00] focus:border-[#FC4C00]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Contact Field */}
              <div>
                <input
                  name="contact"
                  type="tel"
                  placeholder="Contact Number *"
                  value={form.contact}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-2.5 rounded-md outline-none transition-all font-roboto text-[14px] ${
                    errors.contact 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 border" 
                      : "border border-gray-300 focus:ring-2 focus:ring-[#FC4C00] focus:border-[#FC4C00]"
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-600 text-[11px] mt-1">{errors.contact}</p>
                )}
              </div>

              {/* File Upload Field */}
              <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
               Attachment (PDF, Word, Excel, PowerPoint, or Video)
              </label>


                <div
                  className={`relative border-2 border-dashed rounded-md p-3 text-center transition-all ${
                    dragActive 
                      ? "border-[#FC4C00] bg-[#FC4C00]/5" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mov,.avi,.mkv,.webm"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {form.attachment ? (
  <div className="flex items-center justify-center space-x-2">
    {form.attachment.type.startsWith("video") ? (
      <Upload className="text-[#FC4C00]" size={24} />
    ) : (
      <FileText className="text-[#FC4C00]" size={24} />
    )}
    <span className="text-xs text-gray-700 truncate max-w-[180px]">
      {form.attachment.name}
    </span>
    <button
      type="button"
      onClick={removeFile}
      className="text-red-500 hover:text-red-700 transition-colors"
    >
      <X size={14} />
    </button>
  </div>
) : (


                    <div className="flex flex-col items-center space-y-1.5">
                      <Upload className="text-gray-400" size={24} />
                      <p className="text-[11px] text-gray-600">
                        Drag & drop a file here, or <span className="text-[#FC4C00]">browse</span>
                      </p>
                      <p className="text-[10px] text-gray-500">
                        PDF, Word, Excel, PowerPoint files only
                      </p>
                    </div>
                  )}
                </div>
                {errors.attachment && (
                  <p className="text-red-600 text-[11px] mt-1">{errors.attachment}</p>
                )}
              </div>

              {/* Privacy Notice */}
              <p className="text-sm text-gray-600 text-center">
                We never share your contact info with anyone.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FC4C00] text-white font-bold py-2.5 px-4 rounded-md hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-[14px]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
