/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from "html2canvas";
import { uuidv4 } from "zod";
import type { SafeResult } from "../../types";
import { createSafeErrorResult, createSafeSuccessResult } from "../../utils";

type CaptureScreenshotInput = {
    chartRef: any;
    screenshotFilename: string;
    screenshotImageQuality: number;
    screenshotImageType: string;
};
/**
 * Captures a screenshot of a chart rendered in the browser and triggers a download.
 * @see https://medium.com/@pro.grb.studio/how-to-screencapture-in-reactjs-step-by-step-guide-b435e8b53e11
 */
async function captureScreenshot({
    chartRef,
    screenshotFilename,
    screenshotImageQuality,
    screenshotImageType,
}: CaptureScreenshotInput): Promise<SafeResult<boolean>> {
    try {
        const canvas = await html2canvas(chartRef.current, {
            useCORS: true,
        });

        const dataURL = canvas.toDataURL(
            screenshotImageType,
            screenshotImageQuality,
        );
        // Create an image element from the data URL
        const img = new Image();
        img.src = dataURL;
        // Create a link element
        const a = document.createElement("a");
        // Set the href of the link to the data URL of the image
        a.href = img.src;

        const filename = screenshotFilename ? screenshotFilename : uuidv4();
        const extension = screenshotImageType.split("/")[1];

        // Set the download attribute of the link
        a.download = `${filename}.${extension}`;
        // Append the link to the page
        document.body.appendChild(a);
        // Click the link to trigger the download
        a.click();
        // Remove the link from the page
        document.body.removeChild(a);

        return createSafeSuccessResult(true);
    } catch (error: unknown) {
        return createSafeErrorResult(error);
    }
}

export { captureScreenshot };
