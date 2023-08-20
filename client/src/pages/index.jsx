import Header from '../components/landing/Header'
import Hero from '../components/landing/Hero'
function App() {

    return (
        <>
            <div className="h-full overflow-y-auto">
                <div className='container grid px-6 mx-auto'>
                    <Header />
                    <Hero />
                </div>

            </div>
        </>
    )
}

export default App
