export async function generateVideoFromPrompt(prompt: string) {
  console.log("🎥 (FAKE) Generating video for prompt:", prompt);

  // Simulate processing time
  await new Promise(res => setTimeout(res, 1500));

  return {
    url: `https://fake-video-storage.com/videos/${Date.now()}.mp4`,
    duration: 12,
  };
}