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
export interface HardGameScore {
  id?: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSeconds: number;
  timestamp: Timestamp;
  answers: boolean[];
}

export interface HardGameScoreData {
  playerName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSeconds: number;
  timestamp: Timestamp;
  answers: boolean[];
}

// Collection name - SEPARATE from quiz scores
const HARD_GAME_SCORES_COLLECTION = 'hardGameScores';

/**
 * Submit hard game score to Firestore
 * @param playerName - Name of the player
 * @param score - Number of correct answers
 * @param totalQuestions - Total number of questions
 * @param timeSeconds - Time taken in seconds
 * @param answers - Array of boolean results for each question
 * @returns Promise with the document ID
 */
export async function submitHardGameScore(
  playerName: string,
  score: number,
  totalQuestions: number,
  timeSeconds: number,
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
    const scoreData: HardGameScoreData = {
      playerName: playerName.trim(),
      score,
      totalQuestions,
      percentage,
      timeSeconds,
      timestamp: Timestamp.now(),
      answers,
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, HARD_GAME_SCORES_COLLECTION), scoreData);
    
    console.log('✅ Hard game score submitted successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error submitting hard game score:', error);
    throw error;
  }
}

/**
 * Get top scores from Firestore
 * @param limitCount - Number of top scores to retrieve (default: 10)
 * @returns Promise with array of top scores
 */
export async function getTopHardGameScores(limitCount: number = 10): Promise<HardGameScore[]> {
  try {
    const scoresRef = collection(db, HARD_GAME_SCORES_COLLECTION);
    
    // Query: Order by score (desc), then by timeSeconds (asc for fastest)
    const q = query(
      scoresRef,
      orderBy('score', 'desc'),
      orderBy('timeSeconds', 'asc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    
    const scores: HardGameScore[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...(doc.data() as HardGameScoreData),
    }));

    console.log(`✅ Retrieved ${scores.length} top hard game scores`);
    return scores;
  } catch (error) {
    console.error('❌ Error getting top hard game scores:', error);
    throw error;
  }
}

/**
 * Get recent scores from Firestore
 * @param limitCount - Number of recent scores to retrieve (default: 10)
 * @returns Promise with array of recent scores
 */
export async function getRecentHardGameScores(limitCount: number = 10): Promise<HardGameScore[]> {
  try {
    const scoresRef = collection(db, HARD_GAME_SCORES_COLLECTION);
    
    // Query: Order by timestamp (desc for most recent)
    const q = query(
      scoresRef,
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    
    const scores: HardGameScore[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...(doc.data() as HardGameScoreData),
    }));

    console.log(`✅ Retrieved ${scores.length} recent hard game scores`);
    return scores;
  } catch (error) {
    console.error('❌ Error getting recent hard game scores:', error);
    throw error;
  }
}
