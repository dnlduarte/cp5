import { useState, useEffect } from 'react';
import axios from 'axios';

import risotoImage from './assets/risoto.png';
import salmaoImage from './assets/salmao.png';
import paveImage from './assets/pave.png';

import { FaWineGlassAlt, FaUtensils, FaBook } from 'react-icons/fa';

function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = '19f81c3663f548efa66648ab787fac66'; // Substitua por sua chave válida
      const resp = await axios.get(`https://api.spoonacular.com/recipes/random?number=3&apiKey=${apiKey}`);

      if (resp.data?.recipes) {
        setRecipes(resp.data.recipes);
      } else {
        setError("Resposta inesperada da API.");
      }
    } catch (e) {
      console.error('Erro ao buscar receitas:', e);
      if (e.response?.data?.message) {
        setError(`Erro: ${e.response.data.message}`);
      } else {
        setError('Erro ao buscar receitas.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);
  

  const mockRecipes = [
    {
      id: 1,
      title: "Frango ao Curry Cremoso",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      sourceUrl: "https://spoonacular.com/frango-ao-curry-1",
    },
    {
      id: 2,
      title: "Macarrão à Carbonara Clássico",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      sourceUrl: "https://spoonacular.com/carbonara-classico-2",
    },
    {
      id: 3,
      title: "Tiramisu Italiano",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      sourceUrl: "https://spoonacular.com/tiramisu-3",
    },
  ];

  useEffect(() => {
    // Simula um "carregamento" falso com setTimeout
    setLoading(true);
    setTimeout(() => {
      setRecipes(mockRecipes);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="font-sans" style={{ color: '#5C3A21' }}>
      {/* Header */}
      <header className="bg-[#4B2E39] py-10 fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 text-[#F5EBDD] flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-1">
            <FaWineGlassAlt className="text-3xl" />
            Delice & Co
          </h1>
          <nav className="text-[1.320rem] flex gap-8">
            <a href="#home">Home</a>
            <a href="#cardapio">Cardápio</a>
            <a href="#receitas">Receitas</a>
            <a href="#avaliacoes">Avaliações</a>
          </nav>
        </div>
      </header>

      {/* Home */}
      <section id="home" className="pt-40 pb-20 bg-[#F5EBDD] text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#78866B]">
          Bem-vindo à Delice & Co!
        </h2>
        <p className="text-lg mb-6 text-[#5C3A21]">
          Uma experiência gourmet de dar água na boca — sabores requintados, ingredientes selecionados e aquele toque artesanal que faz toda diferença.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#cardapio" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#D1A85C] text-[#4B2E39] hover:bg-[#c4964f] transition">
            <FaUtensils className="text-lg" /> Descubra Nossos Pratos
          </a>
          <a href="#receitas" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#D1A85C] text-[#4B2E39] hover:bg-[#c4964f] transition">
            <FaBook className="text-lg" /> Veja Receitas Incríveis
          </a>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="bg-white px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#4B2E39]">Nosso Cardápio</h2>
          <div className="space-y-12">
            <div className="border-l-4 border-[#D1A85C] pl-4">
              <h3 className="text-2xl font-bold text-[#5C3A21]">Trufado Risoto de Cogumelos</h3>
              <p className="text-lg">Risoto cremoso com mix de cogumelos selvagens, toque de trufa branca, finalizado com lascas de parmesão.</p>
              <img src={risotoImage} className="w-full md:w-1/3 object-cover rounded-lg shadow-md mt-3" alt="Risoto de cogumelos" />
            </div>
            <div className="border-l-4 border-[#D1A85C] pl-4">
              <h3 className="text-2xl font-bold text-[#5C3A21]">Salmão Glaceado com Molho de Maracujá</h3>
              <p className="text-lg">Filé de salmão grelhado, glace leve de maracujá e ervas frescas; acompanha legumes salteados na manteiga de ervas.</p>
              <img src={salmaoImage} className="w-full md:w-1/3 object-cover rounded-lg shadow-md mt-3" alt="Salmão com maracujá" />
            </div>
            <div className="border-l-4 border-[#D1A85C] pl-4">
              <h3 className="text-2xl font-bold text-[#5C3A21]">Pavê de Chocolate Belga & Framboesa</h3>
              <p className="text-lg">Camadas de mousse de chocolate belga, creme suave e framboesas frescas; uma sobremesa leve e irresistível.</p>
              <img src={paveImage} className="w-full md:w-1/3 object-cover rounded-lg shadow-md mt-3" alt="Pavê de chocolate e framboesa" />
            </div>
          </div>
        </div>
      </section>

      {/* Receitas da API */}
      {/*
      <section id="receitas" className="bg-[#F5EBDD] py-40 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#4B2E39] mb-14">Receitas Recomendadas</h2>
          {loading && <p className="text-center text-[#4B2E39] text-lg">Carregando receitas...</p>}
          {error && <p className="text-center text-red-500 text-lg">{error}</p>}
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => {
              const recipeLink =
                recipe.sourceUrl ||
                recipe.spoonacularSourceUrl ||
                `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`;
              return (
                <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-[#4B2E39] mb-4">{recipe.title}</h3>
                    <a
                      href={recipeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block text-center bg-[#D1A85C] text-[#4B2E39] font-semibold py-2 px-4 rounded hover:bg-[#c4964f] transition"
                    >
                      Ver Receita
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      */}

      {/* Receitas (com mock) */}
      <section id="receitas" className="bg-[#F5EBDD] py-40 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#4B2E39] mb-14">Receitas Recomendadas</h2>
          {loading && <p className="text-center text-[#4B2E39] text-lg">Carregando receitas...</p>}
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-[#4B2E39] mb-4">{recipe.title}</h3>
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-center bg-[#D1A85C] text-[#4B2E39] font-semibold py-2 px-4 rounded hover:bg-[#c4964f] transition"
                  >
                    Ver Receita
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="bg-white px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#4B2E39]">O que nossos clientes dizem</h2>
          <div className="space-y-8">
            <div className="bg-[#F5EBDD] shadow-lg rounded-lg p-6">
              <p className="text-lg italic text-[#5C3A21]">“Delice & Co elevou minhas expectativas! Cada prato é uma obra de arte, sabores equilibrados e apresentação impecável.”</p>
              <p className="text-md font-semibold mt-4 text-[#4B2E39]">— Ana Silva</p>
            </div>
            <div className="bg-[#F5EBDD] shadow-lg rounded-lg p-6">
              <p className="text-lg italic text-[#5C3A21]">“O risoto de cogumelos foi espetacular: cremoso, saboroso e com aquele aroma delicioso de trufa.”</p>
              <p className="text-md font-semibold mt-4 text-[#4B2E39]">— Bruno Oliveira</p>
            </div>
            <div className="bg-[#F5EBDD] shadow-lg rounded-lg p-6">
              <p className="text-lg italic text-[#5C3A21]">“Adoro as receitas deles, serviço excelente, e sobremesa de chocolate com framboesa… simplesmente divina.”</p>
              <p className="text-md font-semibold mt-4 text-[#4B2E39]">— Camila Santos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#4B2E39', color: '#F5EBDD' }} className="py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Landing Page - Delice & Co. By Daniel D</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
