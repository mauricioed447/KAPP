import { supabase } from './supabase';

export class ProgressService {
  // Registrar inicio de contenido
  static async startContent(studentId, contentId, topicId, unitId, courseId, levelId) {
    try {
      await supabase.insert('student_progress', {
        student_id: studentId,
        content_id: contentId,
        topic_id: topicId,
        unit_id: unitId,
        course_id: courseId,
        level_id: levelId,
        action_type: 'started',
        accessed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error recording content start:', error);
    }
  }

  // Registrar finalización de contenido
  static async completeContent(studentId, contentId, topicId, unitId, courseId, levelId, score = null, timeSpent = null) {
    try {
      await supabase.insert('student_progress', {
        student_id: studentId,
        content_id: contentId,
        topic_id: topicId,
        unit_id: unitId,
        course_id: courseId,
        level_id: levelId,
        action_type: 'completed',
        score: score,
        time_spent: timeSpent,
        accessed_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error recording content completion:', error);
    }
  }

  // Obtener progreso del estudiante
  static async getStudentProgress(studentId) {
    try {
      const data = await supabase.select('student_progress', 
        `?student_id=eq.${studentId}&select=*&order=accessed_at.desc`
      );
      return data || [];
    } catch (error) {
      console.error('Error fetching student progress:', error);
      return [];
    }
  }

  // Obtener estadísticas del estudiante
  static async getStudentStats(studentId) {
    try {
      const data = await supabase.select('v_student_stats', 
        `?student_id=eq.${studentId}`
      );
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Error fetching student stats:', error);
      return null;
    }
  }
}
