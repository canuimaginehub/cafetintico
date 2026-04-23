import { StubPage } from "@/components/StubPage";

const Cuenta = () => (
  <StubPage
    eyebrow="Mi cuenta"
    title={<>Tu espacio <span className="italic">en TINTICO.</span></>}
    description="Iniciá sesión para gestionar tus pedidos, tu suscripción activa y tu perfil de cata. Próximamente con autenticación segura."
  />
);
export default Cuenta;
