import React, { useEffect } from "react";
import TemperatureGraph from "./TemperatureGraph";
import { TemperatureDataPoint } from "../utils/mockWeatherData";
import "../styles/graphModal.css";

interface GraphModalProps {
  isOpen: boolean;
  cityName: string;
  temperatureData: TemperatureDataPoint[];
  onClose: () => void;
}

const GraphModal: React.FC<GraphModalProps> = ({
  isOpen,
  cityName,
  temperatureData,
  onClose,
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal */}
      <div className="graph-modal">
        <div className="modal-header">
          <h2 className="modal-title">{cityName} - Temperature Trend</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-content">
          <TemperatureGraph cityName={cityName} data={temperatureData} />
        </div>

        <div className="modal-footer">
          <p className="modal-hint">Press ESC to close or click outside</p>
        </div>
      </div>
    </>
  );
};

export default GraphModal;
