import {generateComponents} from "@uploadthing/react";

import type {OurFileRouter} from "@/server/uploadThings/uploadthing";

export const {UploadButton, UploadDropzone, Uploader} =
    generateComponents<OurFileRouter>();
