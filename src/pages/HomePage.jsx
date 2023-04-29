import MainLayout from '../layout/MainLayout'
import DogFacts from '../components/DogFacts'
import { APIProvider } from "../API/APIContext";

export default function HomePage() {
return (
    <div>
        <MainLayout>
            <APIProvider>
                <DogFacts />
            </APIProvider>
        </MainLayout>
    </div>
  )
}
