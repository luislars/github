import json
import os
from datetime import datetime, timedelta

class LicenciaManager:
    def __init__(self, archivo_licencias="licencias.json"):
        self.archivo_licencias = archivo_licencias
        self.licencias = self._cargar_licencias()

    def _cargar_licencias(self):
        if os.path.exists(self.archivo_licencias):
            with open(self.archivo_licencias, "r") as f:
                return json.load(f)
        return {}

    def _guardar_licencias(self):
        with open(self.archivo_licencias, "w") as f:
            json.dump(self.licencias, f, indent=4)

    def crear_licencia(self, usuario, dias_validez=30):
        fecha_expiracion = (datetime.now() + timedelta(days=dias_validez)).strftime("%Y-%m-%d")
        licencia = {
            "usuario": usuario,
            "fecha_expiracion": fecha_expiracion,
            "activa": True
        }
        self.licencias[usuario] = licencia
        self._guardar_licencias()
        return licencia

    def validar_licencia(self, usuario):
        licencia = self.licencias.get(usuario)
        if not licencia:
            return False, "Licencia no encontrada"
        if not licencia["activa"]:
            return False, "Licencia inactiva"
        if datetime.strptime(licencia["fecha_expiracion"], "%Y-%m-%d") < datetime.now():
            return False, "Licencia expirada"
        return True, "Licencia válida"

    def desactivar_licencia(self, usuario):
        if usuario in self.licencias:
            self.licencias[usuario]["activa"] = False
            self._guardar_licencias()
            return True
        return False

# Ejemplo de uso
if __name__ == "__main__":
    manager = LicenciaManager()
    manager.crear_licencia("usuario1", dias_validez=15)
    valido, mensaje = manager.validar_licencia("usuario1")
    print(f"Licencia usuario1: {mensaje}")