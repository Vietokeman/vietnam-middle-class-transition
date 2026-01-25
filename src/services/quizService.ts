import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// TypeScript interfaces
export interface QuizScore {
  id?: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: Timestamp;
  answers: boolean[];
}

export interface QuizScoreData {
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: Timestamp;
  answers: boolean[];
}

// Collection name
const QUIZ_SCORES_COLLECTION = 'quizScores';

/**
 * Submit quiz score to Firestore
 * @param playerName - Name of the player
 * @param score - Number of correct answers
 * @param totalQuestions - Total number of questions
 * @param answers - Array of boolean results for each question
 * @returns Promise with the document ID
 */
export async function submitQuizScore(
  playerName: string,
  score: number,
  totalQuestions: number,
  answers: boolean[]
): Promise<string> {
  try {
    // Validate input
    if (!playerName || playerName.trim().length < 2) {
      throw new Error('Tên phải có ít nhất 2 ký tự');
    }

    if (score < 0 || score > totalQuestions) {
      throw new Error('Điểm số không hợp lệ');
    }

    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);

    // Prepare data
    const scoreData: QuizScoreData = {
      playerName: playerName.trim(),
      score,
      totalQuestions,
      percentage,
      timestamp: Timestamp.now(),
      answers,
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, QUIZ_SCORES_COLLECTION), scoreData);
    
    console.log('✅ Quiz score submitted successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error submitting quiz score:', error);
    throw error;
  }
}

/**
 * Get top scores from Firestore
 * @param limitCount - Number of top scores to retrieve (default: 10)
 * @returns Promise with array of top scores
 */
export async function getTopScores(limitCount: number = 10): Promise<QuizScore[]> {
  try {
    const scoresRef = collection(db, QUIZ_SCORES_COLLECTION);
    
    // Query: Order by score (desc), then by timestamp (asc for earliest)
    const q = query(
      scoresRef,
      orderBy('score', 'desc'),
      orderBy('timestamp', 'asc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    
    const scores: QuizScore[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...(doc.data() as QuizScoreData),
    }));

    console.log(`✅ Retrieved ${scores.length} top scores`);
    return scores;
  } catch (error) {
    console.error('❌ Error getting top scores:', error);
    throw error;
  }
}

/**
 * Get recent scores from Firestore
 * @param limitCount - Number of recent scores to retrieve (default: 10)
 * @returns Promise with array of recent scores
 */
export async function getRecentScores(limitCount: number = 10): Promise<QuizScore[]> {
  try {
    const scoresRef = collection(db, QUIZ_SCORES_COLLECTION);
    
    // Query: Order by timestamp (desc for most recent)
    const q = query(
      scoresRef,
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    
    const scores: QuizScore[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...(doc.data() as QuizScoreData),
    }));

    console.log(`✅ Retrieved ${scores.length} recent scores`);
    return scores;
  } catch (error) {
    console.error('❌ Error getting recent scores:', error);
    throw error;
  }
}
