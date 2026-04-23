import { StubPage } from "@/components/StubPage";

const NuestroCafe = () => (
  <StubPage
    eyebrow="Nuestro café"
    title={<>Una filosofía <span className="italic">de origen y precisión.</span></>}
    description="Buscamos microlotes con identidad. Cafés que cuenten una historia, con productores trazados y procesos cuidados. Tostamos en pequeños lotes para preservar cada matiz."
  />
);
export default NuestroCafe;
