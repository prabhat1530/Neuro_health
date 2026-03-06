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
    "stress": "Psychiatrist",
    "headache": "Neurologist",
    "migraine": "Neurologist",
    "dizziness": "Neurologist",
    "eye pain": "Ophthalmologist",
    "vision problem": "Ophthalmologist",
    "blurry vision": "Ophthalmologist",
    "ear pain": "ENT Specialist",
    "hearing loss": "ENT Specialist",
    "sore throat": "ENT Specialist",
    "sinus": "ENT Specialist",
    "diabetes": "Endocrinologist",
    "thyroid": "Endocrinologist",
    "gas": "Gastroenterologist",
    "acidity": "Gastroenterologist",
    "blood in stool": "Gastroenterologist",
    "asthma": "Pulmonologist",
    "breathing problem": "Pulmonologist"
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
