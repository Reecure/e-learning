import {createNextPageApiHandler} from "uploadthing/next-legacy";

import {ourFileRouter} from "@/server/uploadThings/uploadthing";

const handler = createNextPageApiHandler({
    router: ourFileRouter,
});

export default handler;
