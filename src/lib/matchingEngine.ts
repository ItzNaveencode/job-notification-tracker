import type { Job } from '../types/job'
import type { JobPreferences } from '../types/preferences'

export function calculateMatchScore(job: Job, preferences: JobPreferences): number {
    let score = 0;

    // Normalize job properties
    const jobTitle = job.title.toLowerCase();
    const jobDescription = job.description.toLowerCase();
    const jobLocation = job.location.toLowerCase();
    const jobMode = job.mode.toLowerCase();
    const jobExperience = job.experience.toLowerCase();
    const jobSource = job.source.toLowerCase();
    const jobSkills = job.skills.map(skill => skill.toLowerCase());

    // Normalize preferences
    const prefRoleKeywords = preferences.roleKeywords.map(kw => kw.toLowerCase().trim());
    const prefLocations = preferences.preferredLocations.map(loc => loc.toLowerCase().trim());
    const prefModes = preferences.preferredMode.map(mode => mode.toLowerCase().trim());
    const prefSkills = preferences.skills.map(skill => skill.toLowerCase().trim());
    const prefExperience = preferences.experienceLevel.toLowerCase().trim();

    // 1. Role Keyword in Title (+25)
    // Check if ANY roleKeyword appears in job.title
    if (prefRoleKeywords.some(keyword => jobTitle.includes(keyword))) {
        score += 25;
    }

    // 2. Role Keyword in Description (+15)
    // Check if ANY roleKeyword appears in job.description
    if (prefRoleKeywords.some(keyword => jobDescription.includes(keyword))) {
        score += 15;
    }

    // 3. Location Match (+15)
    // Check if job.location matches one of preferredLocations
    if (prefLocations.includes(jobLocation)) {
        score += 15;
    }

    // 4. Mode Match (+10)
    // Check if job.mode matches one of preferredMode
    if (prefModes.includes(jobMode)) {
        score += 10;
    }

    // 5. Experience Match (+10)
    // Check if job.experience matches experienceLevel
    if (jobExperience === prefExperience) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    // Check if ANY overlap between job.skills and preferences.skills
    // Using Array.some() directly on the arrays
    const hasSkillOverlap = jobSkills.some(jSkill => prefSkills.includes(jSkill));
    if (hasSkillOverlap) {
        score += 15;
    }

    // 7. Freshness Bonus (+5)
    // Check if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source Bonus (+5)
    // Check if source === 'linkedIn' (case-insensitive)
    if (jobSource === 'linkedin') {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
}

export function scoreJobs(jobs: Job[], preferences: JobPreferences): Job[] {
    return jobs.map(job => ({
        ...job,
        matchScore: calculateMatchScore(job, preferences)
    }));
}
