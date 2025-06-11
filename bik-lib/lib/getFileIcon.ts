import txt from "./lib-icons/txt.svg";
import pdf from "./lib-icons/pdf.svg";
import audio from "./lib-icons/audio.svg";
import doc from "./lib-icons/doc.svg";
import file from "./lib-icons/file.svg";
import img from "./lib-icons/img.svg";
import video from "./lib-icons/video.svg";

export default (fileType: string) => {
  // pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .mp4, .avi, .wmv, .mov, .3gp, .3g2, .ogg, .webm, .mp3, .wav, .mp4
  switch (fileType) {
    case "pdf":
      return pdf;
    case "txt":
      return txt;
    case "doc":
    case "docx":
      return doc;
    case "jpg":
    case "jpeg":
    case "png":
      return img;
    case "mp4":
    case "avi":
    case "wmv":
    case "mov":
    case "3gp":
    case "3g2":
    case "ogg":
    case "webm":
      return video;
    case "mp3":
    case "wav":
      return audio;
    default:
      return file;
  }
};
