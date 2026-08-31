import { apiFetch } from '@/lib/api';

export interface QuestionItemFrontend {
  id: number;
  stage: number;
  stageLabel: string;
  stageStep: number;
  stageTotalSteps: number;
  title: string;
  subtitle?: string;
  type: 'checkbox' | 'radio';
  maxSelect?: number;
  options: string[];
  buttonText: string;
}

export interface AssessmentResultData {
  assessmentId: string;
  mutismSeverity: 'mild' | 'moderate' | 'severe';
  anxietyLevel: string;
  anxietyScore: number;
  totalScore: number;
  practices: string[];
  target: string;
  recommendations: string[];
  aiAnalysisSummary: string;
  therapyPlan: {
    planId: string;
    currentWeek: number;
    status: string;
  };
}

export class AssessmentService {
  /**
   * Fetches the 12 onboarding assessment questions from backend.
   */
  public static async getQuestions(token?: string | null): Promise<QuestionItemFrontend[]> {
    const res = await apiFetch<QuestionItemFrontend[]>('/assessments/questions', {
      method: 'GET',
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal mengambil daftar pertanyaan asesmen');
    }

    return res.data;
  }

  /**
   * Submits initial onboarding assessment answers payload to backend.
   */
  public static async submitAssessment(
    answersPayload: Record<number, string[]>,
    token?: string | null
  ): Promise<AssessmentResultData> {
    const res = await apiFetch<AssessmentResultData>('/assessments', {
      method: 'POST',
      body: JSON.stringify({
        answersPayload,
      }),
    }, token);

    if (!res.data) {
      throw new Error(res.message || 'Gagal menyimpan hasil asesmen');
    }

    return res.data;
  }
}
