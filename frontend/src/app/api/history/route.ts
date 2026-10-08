import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 'vver_sample_1',
      filename: 'sample_deepfake_video.mp4',
      verification_type: 'video',
      overall_assessment: 'Potentially manipulated',
      overall_score: 0.84,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    },
    {
      id: 'vver_sample_2',
      filename: 'voice_recording_call.wav',
      verification_type: 'voice',
      overall_assessment: 'Likely authentic',
      overall_score: 0.12,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
  ]);
}
