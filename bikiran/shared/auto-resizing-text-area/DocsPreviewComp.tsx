import { cn } from '@/bik-lib/utils/cn';
import { icons, supportInfoIcons } from '@/bikiran/lib/icons';
import Image from 'next/image';
import React from 'react';

type DocsPreviewProps = {
    previews: (string | ArrayBuffer | null)[]; // Array to store multiple previews
    files: File[]; // Array of files
    handleClearSelection: (index: number) => void; // Function to clear a specific preview
    className?: string; // Optional className
}

const DocsPreviewComp: React.FC<DocsPreviewProps> = ({ previews, files, handleClearSelection, className }) => {
    return (
        <div className='flex flex-wrap gap-4'>
            {files.map((file, index) => (
                <div key={index} className={cn("relative mt-2", className)}>
                    {previews[index] && typeof previews[index] === 'string' && previews[index]?.startsWith('data:image/') ? (
                        <div>
                            <Image src={previews[index] as string} alt="Image Preview" layout='fill' objectFit='cover' className='size-16 object-cover rounded' />
                            <button
                                type="button"
                                className="absolute top-0 right-0 rounded-full"
                                onClick={() => handleClearSelection(index)}
                            >
                                <Image src={supportInfoIcons.iconCloseWhite} width={0} height={0} alt='closeIcon' />
                            </button>
                        </div>
                    ) : (
                        previews[index] === supportInfoIcons.iconPdf && (
                            <div className="flex items-center justify-center h-full">
                                <Image src={supportInfoIcons.iconPdf} alt="PDF Icon" width={0} height={0} className='size-16' />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 rounded-full"
                                    onClick={() => handleClearSelection(index)}
                                >
                                    <Image src={supportInfoIcons.iconCloseHover} width={0} height={0} alt='closeIcon' />
                                </button>
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}

export default DocsPreviewComp;
