"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Calendar, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReservationModalProps {
  carId: string;
  carTitle?: string;
  onClose: () => void;
}

export default function ReservationModal({ carId, carTitle, onClose }: ReservationModalProps) {
  const { user } = useUser();
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [duration, setDuration] = useState<number>(60); // Par défaut : 1 heure
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError("Vous devez être connecté pour effectuer une réservation");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          appointmentDate: new Date(appointmentDate).toISOString(),
          duration,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la réservation");
      }

      // Réservation réussie
      alert("Réservation effectuée avec succès !");
      onClose();
    } catch (err) {
      console.error("Erreur lors de la réservation :", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {carTitle ? `Réserver: ${carTitle}` : "Réserver cette voiture"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            ✕
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointment-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Date et heure
            </Label>
            <Input
              id="appointment-date"
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Durée (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10) || 60)}
              min="30"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message (optionnel)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Traitement en cours..." : "Confirmer la réservation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}