export class FileOperation {
  allowedFileTypes: string[] = [];
  allowedFileExtensions: string[] = [];
  allowedFileSizeMax = 0;
  allowedFileSizMin = 0;
  allowedFileCount = 0;

  setAllowedFileTypes(types: string[]) {
    this.allowedFileTypes = types;
  }

  setAllowedFileExtensions(extensions: string[]) {
    this.allowedFileExtensions = extensions;
  }

  setAllowedFileSize(min: number, max: number) {
    this.allowedFileSizMin = min;
    this.allowedFileSizeMax = max;
  }

  setAllowedFileCount(count: number) {
    this.allowedFileCount = count;
  }

  isFileAllowed(file: File): boolean {
    if (this.allowedFileTypes.length > 0 && !this.allowedFileTypes.includes(file.type)) {
      return false;
    }

    if (this.allowedFileExtensions.length > 0 && !this.allowedFileExtensions.includes(file.name.split(".").pop() || "")) {
      return false;
    }

    if (this.allowedFileSizeMax > 0 && file.size > this.allowedFileSizeMax) {
      return false;
    }

    if (this.allowedFileSizMin > 0 && file.size < this.allowedFileSizMin) {
      return false;
    }

    return true;
  }

  isFileCountAllowed(files: FileList): boolean {
    return files.length <= this.allowedFileCount;
  }

  getFileInfo(file: File): { name: string; size: number } {
    return { name: file.name, size: file.size };
  }

  getFileInfoList(files: FileList): { name: string; size: number }[] {
    const list: { name: string; size: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      list.push({ name: files[i].name, size: files[i].size });
    }

    return list;
  }

  getFileSize(file: File): number {
    return file.size;
  }

  getFileSizeList(files: FileList): number {
    let size = 0;

    for (let i = 0; i < files.length; i++) {
      size += files[i].size;
    }

    return size;
  }

  getFileSizeInKB(file: File): number {
    return file.size / 1024;
  }

  getFileSizeInMB(file: File): number {
    return file.size / (1024 * 1024);
  }

  getFileSizeInGB(file: File): number {
    return file.size / (1024 * 1024 * 1024);
  }

  getFileSizeListInKB(files: FileList): number {
    let size = 0;

    for (let i = 0; i < files.length; i++) {
      size += files[i].size;
    }

    return size / 1024;
  }

  getFileSizeListInMB(files: FileList): number {
    let size = 0;

    for (let i = 0; i < files.length; i++) {
      size += files[i].size;
    }

    return size / (1024 * 1024);
  }

  getFileSizeListInGB(files: FileList): number {
    let size = 0;

    for (let i = 0; i < files.length; i++) {
      size += files[i].size;
    }

    return size / (1024 * 1024 * 1024);
  }

  static chkFileType(fileType: string): "image" | "unknown" {
    if (fileType.includes("image")) {
      return "image";
    }
    return "unknown";
  }
}
