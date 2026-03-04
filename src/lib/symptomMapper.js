export const symptomMap = {
    "stomach pain": "General Physician",
    "acid reflux": "General Physician",
    "heartburn": "General Physician",
    "chest pain": "Cardiologist",
    "heart attack": "Cardiologist",
    "palpitations": "Cardiologist",
    "toothache": "Dentist",
    "teeth pain": "Dentist",
    "bleeding gums": "Dentist",
    "pregnancy": "Gynecologist",
    "period": "Gynecologist",
    "irregular periods": "Gynecologist",
    "acne": "Dermatologist",
    "pimple": "Dermatologist",
    "skin rash": "Dermatologist",
    "hair fall": "Dermatologist",
    "fever": "General Physician",
    "cough": "General Physician",
    "cold": "General Physician",
    "child fever": "Pediatrician",
    "baby not well": "Pediatrician",
    "child vaccination": "Pediatrician",
    "joint pain": "Orthopedist",
    "back pain": "Orthopedist",
    "bone fracture": "Orthopedist",
    "knee pain": "Orthopedist",
    "depression": "Psychiatrist",
    "anxiety": "Psychiatrist",
    "stress": "Psychiatrist"
};

export function getSpecialtiesForQuery(query) {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    const matchedSpecialties = new Set();

    for (const [symptom, specialty] of Object.entries(symptomMap)) {
        if (lowerQuery.includes(symptom) || symptom.includes(lowerQuery)) {
            matchedSpecialties.add(specialty);
        }
    }

    return Array.from(matchedSpecialties);
}
