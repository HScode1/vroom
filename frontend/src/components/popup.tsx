'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Popup({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        duration: '',
        vroomer: '',
        date: '',
        time: '',
        motorisation: '',
        budget: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [minDate, setMinDate] = useState('');

    // Définir la date minimale (aujourd'hui) lors du montage
    useEffect(() => {
        const today = new Date();
        setMinDate(today.toISOString().split('T')[0]);
    }, []);

    // Gestion des changements dans les champs du formulaire
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Soumission du formulaire avec simulation de délai
    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                resetForm();
            }, 3000);
        }, 1500);
    };

    // Réinitialisation du formulaire
    const resetForm = () => {
        setStep(1);
        setFormData({
            duration: '',
            vroomer: '',
            date: '',
            time: '',
            motorisation: '',
            budget: ''
        });
        setIsSubmitted(false);
    };

    // Formatage de la date pour l'affichage
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Nom complet du Vroomer
    const getFullVroomerName = (vroomer) => {
        switch (vroomer) {
            case 'zinedine': return 'Zinedine Aberkane';
            case 'lopez': return 'Michel Lopez';
            default: return '';
        }
    };

    // Vérification si l'étape actuelle est complète
    const isStepComplete = () => {
        switch (step) {
            case 1: return formData.duration && formData.vroomer;
            case 2: return formData.date && formData.time;
            case 3: return formData.motorisation && formData.budget;
            default: return false;
        }
    };

    // Variantes d'animation pour les transitions
    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        })
    };

    // Animation de chargement
    const spinTransition = { loop: Infinity, ease: 'linear', duration: 1 };

    // Rendu des étapes du formulaire
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div className="space-y-6" initial="hidden" animate="visible" exit="exit" variants={slideVariants} custom={1}>
                        <h4 className="text-xl font-semibold text-gray-800">Étape 1 - Durée & Vroomer</h4>
                        <div className="space-y-6">
                            {/* Sélection de la durée */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    Durée du rendez-vous
                                </label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {['30', '60'].map((value) => (
                                        <label key={value} className={`p-4 border rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${formData.duration === value ? 'bg-lime-100 border-lime-400 ring-2 ring-lime-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="duration" value={value} checked={formData.duration === value} onChange={handleInputChange} className="sr-only" aria-label={`${value} minutes`} />
                                            <div className="text-center">
                                                <span className="block text-xl font-bold text-gray-800">{value}</span>
                                                <span className="text-sm text-gray-600">minutes</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Sélection du Vroomer */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Choisir votre Vroomer
                                </label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {[
                                        { value: 'zinedine', name: 'Zinedine', role: 'Expert Véhicules Électriques', status: 'Disponible', statusColor: 'bg-green-100 text-green-800' },
                                        { value: 'lopez', name: 'M. Lopez', role: 'Spécialiste Financement', status: '4.9/5 (36 avis)', statusColor: 'bg-blue-100 text-blue-800' }
                                    ].map((vroomer) => (
                                        <label key={vroomer.value} className={`p-4 border rounded-lg flex flex-col items-center cursor-pointer transition-all duration-200 ${formData.vroomer === vroomer.value ? 'bg-lime-100 border-lime-400 ring-2 ring-lime-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="vroomer" value={vroomer.value} checked={formData.vroomer === vroomer.value} onChange={handleInputChange} className="sr-only" aria-label={vroomer.name} />
                                            <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 overflow-hidden flex items-center justify-center shadow-inner">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-gray-800 text-lg">{vroomer.name}</span>
                                            <span className="text-xs text-gray-500 mt-1">{vroomer.role}</span>
                                            <span className={`mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${vroomer.statusColor}`}>
                                                <svg className={`mr-1 h-2.5 w-2.5 ${vroomer.value === 'zinedine' ? 'text-green-500' : 'text-blue-500'}`} fill="currentColor" viewBox="0 0 8 8">
                                                    <circle cx="4" cy="4" r="3" />
                                                </svg>
                                                {vroomer.status}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <motion.button onClick={nextStep} disabled={!isStepComplete()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center">
                            <span>Suivant</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div className="space-y-6" initial="hidden" animate="visible" exit="exit" variants={slideVariants} custom={1}>
                        <h4 className="text-xl font-semibold text-gray-800">Étape 2 - Date & Heure</h4>
                        <div className="space-y-6">
                            {/* Sélection de la date */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                    Date du rendez-vous
                                </label>
                                <div className="mt-2">
                                    <div className="relative">
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} min={minDate} className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent shadow-sm hover:shadow transition-all duration-300" aria-label="Sélectionnez une date" />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formData.date && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Rendez-vous le <span className="font-medium ml-1">{formatDate(formData.date)}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Sélection de l'heure */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    Heure du rendez-vous
                                </label>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">Créneaux populaires :</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['09:00', '10:30', '14:00', '16:30'].map((timeOption) => (
                                            <label key={timeOption} className={`p-3 border rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${formData.time === timeOption ? 'bg-lime-100 border-lime-400 ring-2 ring-lime-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                                <input type="radio" name="time" value={timeOption} checked={formData.time === timeOption} onChange={handleInputChange} className="sr-only" aria-label={`${timeOption}`} />
                                                <span className="text-sm font-medium">{timeOption}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center mb-3">
                                        <hr className="flex-grow border-gray-200" />
                                        <span className="px-3 text-xs text-gray-500">ou choisir un autre horaire</span>
                                        <hr className="flex-grow border-gray-200" />
                                    </div>
                                    <div className="relative">
                                        <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent shadow-sm hover:shadow transition-all duration-300" aria-label="Sélectionnez une heure personnalisée" />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {formData.time && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <p className="text-sm text-gray-700 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Rendez-vous à <span className="font-medium ml-1">{formData.time}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <motion.button onClick={prevStep} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <span>Précédent</span>
                            </motion.button>
                            <motion.button onClick={nextStep} disabled={!isStepComplete()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-1/2 bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center">
                                <span>Suivant</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div className="space-y-6" initial="hidden" animate="visible" exit="exit" variants={slideVariants} custom={1}>
                        <h4 className="text-xl font-semibold text-gray-800">Étape 3 - Informations du véhicule</h4>
                        <div className="mb-5 bg-gradient-to-r from-lime-50 to-lime-100 rounded-lg p-4 border border-lime-200 shadow-sm">
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                <h5 className="font-semibold text-gray-800">Récapitulatif du rendez-vous</h5>
                            </div>
                            <div className="pl-7 space-y-1 text-gray-600">
                                <p className="flex items-center"><span className="w-24 text-gray-500">Durée:</span><span className="font-medium">{formData.duration} minutes</span></p>
                                <p className="flex items-center"><span className="w-24 text-gray-500">Avec:</span><span className="font-medium">{getFullVroomerName(formData.vroomer)}</span></p>
                                <p className="flex items-center"><span className="w-24 text-gray-500">Date:</span><span className="font-medium">{formatDate(formData.date)}</span></p>
                                <p className="flex items-center"><span className="w-24 text-gray-500">Heure:</span><span className="font-medium">{formData.time}</span></p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {/* Sélection du type de motorisation */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                                    </svg>
                                    Type de motorisation
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    {[
                                        { value: 'essence', label: 'Essence', icon: '⛽', desc: 'Moteur thermique classique' },
                                        { value: 'diesel', label: 'Diesel', icon: '🛢️', desc: 'Économique sur longue distance' },
                                        { value: 'electrique', label: 'Électrique', icon: '⚡', desc: 'Zéro émission directe' },
                                        { value: 'hybride', label: 'Hybride', icon: '🔋', desc: 'Combinaison thermique/électrique' }
                                    ].map((option) => (
                                        <label key={option.value} className={`p-4 border rounded-lg flex flex-col cursor-pointer transition-all duration-200 ${formData.motorisation === option.value ? 'bg-lime-100 border-lime-400 ring-2 ring-lime-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="motorisation" value={option.value} checked={formData.motorisation === option.value} onChange={handleInputChange} className="sr-only" aria-label={option.label} />
                                            <div className="flex items-center mb-1">
                                                <span className="mr-2 text-xl">{option.icon}</span>
                                                <span className="font-medium text-gray-800">{option.label}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{option.desc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Sélection du budget */}
                            <div className="transition-all duration-300 hover:shadow-md rounded-lg p-5 border border-transparent hover:border-gray-200 bg-white">
                                <label className="block text-lg text-gray-800 mb-3 flex items-center font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lime-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Budget approximatif
                                </label>
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {['15000', '25000', '35000', '50000'].map((budgetOption) => (
                                        <label key={budgetOption} className={`p-3 border rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${formData.budget === budgetOption ? 'bg-lime-100 border-lime-400 ring-2 ring-lime-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                                            <input type="radio" name="budget" value={budgetOption} checked={formData.budget === budgetOption} onChange={handleInputChange} className="sr-only" aria-label={`${parseInt(budgetOption).toLocaleString()} €`} />
                                            <span className="text-sm font-medium">{parseInt(budgetOption).toLocaleString()} €</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="relative">
                                    <div className="flex items-center mb-3">
                                        <hr className="flex-grow border-gray-200" />
                                        <span className="px-3 text-xs text-gray-500">ou précisez votre budget</span>
                                        <hr className="flex-grow border-gray-200" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <span className="text-gray-500">€</span>
                                        </div>
                                        <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="Entrez votre budget" min="1000" max="100000" step="1000" className="w-full p-4 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent shadow-sm hover:shadow transition-all duration-300" aria-label="Budget personnalisé" />
                                    </div>
                                    {formData.budget && (
                                        <div className="mt-4">
                                            <div className="flex justify-between mb-1 text-sm">
                                                <span className="text-gray-600">Budget estimé</span>
                                                <span className="font-medium text-gray-800">{parseInt(formData.budget).toLocaleString()} €</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div className="bg-gradient-to-r from-lime-300 to-lime-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(100, (formData.budget / 50000) * 100)}%` }}></div>
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                <span>Entrée de gamme</span>
                                                <span>Milieu de gamme</span>
                                                <span>Haut de gamme</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <motion.button onClick={prevStep} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <span>Précédent</span>
                            </motion.button>
                            <motion.button onClick={handleSubmit} disabled={!isStepComplete() || isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-1/2 bg-lime-400 hover:bg-lime-500 text-gray-900 font-medium py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center">
                                {isSubmitting ? (
                                    <>
                                        <motion.svg animate={{ rotate: 360 }} transition={spinTransition} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </motion.svg>
                                        <span>Traitement en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Confirmer le rendez-vous</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl"></div>
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Fermer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="text-center mb-6">
                                        <div className="inline-block p-4 rounded-full bg-lime-100 mb-4 border border-lime-200 shadow-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Prendre rendez-vous</h3>
                                        <p className="text-gray-600">Étape {step} sur 3</p>
                                    </div>
                                    <div className="mb-8">
                                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div className="h-full bg-gradient-to-r from-lime-400 to-lime-500" initial={{ width: `${((step - 1) / 3) * 100}%` }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.3 }}></motion.div>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div className={`text-xs font-medium ${step >= 1 ? 'text-lime-600' : 'text-gray-400'}`}>Choix</div>
                                            <div className={`text-xs font-medium ${step >= 2 ? 'text-lime-600' : 'text-gray-400'}`}>Calendrier</div>
                                            <div className={`text-xs font-medium ${step >= 3 ? 'text-lime-600' : 'text-gray-400'}`}>Détails</div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 relative overflow-hidden">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.div key={step} initial="hidden" animate="visible" exit="exit" variants={slideVariants} custom={step}>
                                                {renderStep()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 20, stiffness: 100 }} className="text-center py-8">
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.2 }} className="inline-block p-6 rounded-full bg-green-100 mb-6 border border-green-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Rendez-vous confirmé !</h3>
                                    <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-xl p-5 mb-6 border border-green-100 shadow-sm">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <span className="text-gray-600">Vroomer:</span>
                                                <span className="font-medium text-gray-800">{getFullVroomerName(formData.vroomer)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <span className="text-gray-600">Date:</span>
                                                <span className="font-medium text-gray-800">{formatDate(formData.date)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <span className="text-gray-600">Heure:</span>
                                                <span className="font-medium text-gray-800">{formData.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Durée:</span>
                                                <span className="font-medium text-gray-800">{formData.duration} minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-blue-700">Un email de confirmation vous a été envoyé</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all duration-300">
                                            Fermer
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="flex-1 px-6 py-3 bg-lime-100 hover:bg-lime-200 text-lime-800 rounded-xl font-medium transition-all duration-300">
                                            Ajouter à mon calendrier
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}