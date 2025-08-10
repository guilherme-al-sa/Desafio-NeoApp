
// Cliente mockado com dados realistas da Marvel

const mockComicsDatabase = [
  {
    id: 1,
    title: "Spider-Man: Amazing Fantasy #15",
    description: "A primeira aparição do Homem-Aranha! Peter Parker ganha seus poderes após ser picado por uma aranha radioativa.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51ylofh3QmL._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 25.99 }],
    creators: {
      items: [
        { name: "Stan Lee", role: "writer" },
        { name: "Steve Ditko", role: "artist" }
      ]
    },
    pageCount: 32,
    series: { name: "Amazing Fantasy" }
  },
  {
    id: 2,
    title: "X-Men: Dark Phoenix Saga",
    description: "Jean Grey se transforma na Fênix Negra em uma das sagas mais épicas dos X-Men.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51fo8+dZIML._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 19.99 }],
    creators: {
      items: [
        { name: "Chris Claremont", role: "writer" },
        { name: "John Byrne", role: "artist" }
      ]
    },
    pageCount: 28,
    series: { name: "Uncanny X-Men" }
  },
  {
    id: 3,
    title: "Avengers: Infinity War",
    description: "Thanos busca as Joias do Infinito enquanto os Vingadores tentam impedi-lo.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/91Ngg-4Lh9L._SY425_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 15.99 }],
    creators: {
      items: [
        { name: "Jim Starlin", role: "writer" },
        { name: "George Pérez", role: "artist" }
      ]
    },
    pageCount: 36,
    series: { name: "Avengers" }
  },
  {
    id: 4,
    title: "Iron Man: Demon in a Bottle",
    description: "Tony Stark enfrenta seus demons pessoais e problemas com alcoolismo.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51yjWl0F8PL.jpg",
      extension: "jpg"
    },
    prices: [{ price: 18.99 }],
    creators: {
      items: [
        { name: "David Michelinie", role: "writer" },
        { name: "Bob Layton", role: "artist" }
      ]
    },
    pageCount: 24,
    series: { name: "Iron Man" }
  },
  {
    id: 5,
    title: "Thor: Ragnarok",
    description: "O crepúsculo dos deuses chegou a Asgard! Thor deve salvar seu reino da destruição.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51bnVGusL-L._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 22.99 }],
    creators: {
      items: [
        { name: "Walt Simonson", role: "writer" },
        { name: "Walt Simonson", role: "artist" }
      ]
    },
    pageCount: 30,
    series: { name: "Thor" }
  },
  {
    id: 6,
    title: "Captain America: Winter Soldier",
    description: "Bucky Barnes retorna como o Soldado Invernal, forçando Steve Rogers a confrontar seu passado.",
    thumbnail: {
      path: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop",
      extension: "jpg"
    },
    prices: [{ price: 16.99 }],
    creators: {
      items: [
        { name: "Ed Brubaker", role: "writer" },
        { name: "Steve Epting", role: "artist" }
      ]
    },
    pageCount: 28,
    series: { name: "Captain America" }
  },
  {
    id: 7,
    title: "Hulk: Planet Hulk",
    description: "Exilado no espaço, Hulk se torna gladiador em um planeta alienígena.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51JbViOxqPL._SX342_SY445_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 20.99 }],
    creators: {
      items: [
        { name: "Greg Pak", role: "writer" },
        { name: "Carlo Pagulayan", role: "artist" }
      ]
    },
    pageCount: 32,
    series: { name: "Incredible Hulk" }
  },
  {
    id: 8,
    title: "Doctor Strange: Into the Dark Dimension",
    description: "Stephen Strange explora as dimensões místicas para proteger a Terra de ameaças sobrenaturais.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51NzeTSZK+L._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 17.99 }],
    creators: {
      items: [
        { name: "Steve Ditko", role: "writer" },
        { name: "Steve Ditko", role: "artist" }
      ]
    },
    pageCount: 26,
    series: { name: "Doctor Strange" }
  },
  {
    id: 9,
    title: "Black Widow: Red Room",
    description: "Natasha Romanoff confronta seu passado sombrio na Sala Vermelha.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/51s41H6ljdL._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 14.99 }],
    creators: {
      items: [
        { name: "Kelly Sue DeConnick", role: "writer" },
        { name: "Phil Noto", role: "artist" }
      ]
    },
    pageCount: 22,
    series: { name: "Black Widow" }
  },
  {
    id: 10,
    title: "Guardians of the Galaxy: Legacy",
    description: "Star-Lord e os Guardiões enfrentam uma nova ameaça cósmica.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/61Sgub0oIPL._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 21.99 }],
    creators: {
      items: [
        { name: "Brian Michael Bendis", role: "writer" },
        { name: "Valerio Schiti", role: "artist" }
      ]
    },
    pageCount: 28,
    series: { name: "Guardians of the Galaxy" }
  },
  {
    id: 11,
    title: "Fantastic Four: Coming of Galactus",
    description: "O Devorador de Mundos chega à Terra! O Quarteto Fantástico deve encontrar uma forma de salvá-la.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/510oKZgKSCL._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 23.99 }],
    creators: {
      items: [
        { name: "Stan Lee", role: "writer" },
        { name: "Jack Kirby", role: "artist" }
      ]
    },
    pageCount: 34,
    series: { name: "Fantastic Four" }
  },
  {
    id: 12,
    title: "Daredevil: Born Again",
    description: "Matt Murdock tem sua vida destruída pelo Rei do Crime em uma das melhores histórias do Demolidor.",
    thumbnail: {
      path: "https://m.media-amazon.com/images/I/41U4pDb7+3L._SY445_SX342_.jpg",
      extension: "jpg"
    },
    prices: [{ price: 19.99 }],
    creators: {
      items: [
        { name: "Frank Miller", role: "writer" },
        { name: "David Mazzucchelli", role: "artist" }
      ]
    },
    pageCount: 30,
    series: { name: "Daredevil" }
  }
];


class MockMarvelClient {
  constructor() {
    this.database = mockComicsDatabase;
    console.log('MockMarvelClient inicializado com', this.database.length, 'comics');
  }

  // Simular delay de rede
  async delay(ms = 500 + Math.random() * 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Buscar comics com paginação
  async fetchComics({ limit = 20, offset = 0, titleStartsWith } = {}) {
    console.log('Buscando comics mockados...', { limit, offset, titleStartsWith });
    
    await this.delay();

    let results = [...this.database];

    // Filtrar por título se especificado
    if (titleStartsWith && titleStartsWith.trim()) {
      results = results.filter(comic => 
        comic.title.toLowerCase().includes(titleStartsWith.toLowerCase())
      );
    }

    // Aplicar paginação
    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total: total,
      offset: offset,
      limit: limit,
      count: paginatedResults.length
    };
  }

  // Buscar comic específico por ID
  async fetchComicById(id) {
    console.log('Buscando comic por ID:', id);
    
    await this.delay(300);

    const comic = this.database.find(c => c.id === parseInt(id));
    
    if (!comic) {
      throw new Error(`Comic com ID ${id} não encontrado`);
    }

    return {
      results: [comic],
      total: 1,
      offset: 0,
      limit: 1,
      count: 1
    };
  }

  // Buscar comics por série
  async fetchComicsBySeries(seriesName, { limit = 20, offset = 0 } = {}) {
    console.log('Buscando comics da série:', seriesName);
    
    await this.delay();

    const results = this.database.filter(comic => 
      comic.series.name.toLowerCase().includes(seriesName.toLowerCase())
    );

    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total: total,
      offset: offset,
      limit: limit,
      count: paginatedResults.length
    };
  }

  // Buscar comics por faixa de preço
  async fetchComicsByPriceRange(minPrice, maxPrice, { limit = 20, offset = 0 } = {}) {
    console.log('Buscando comics na faixa de preço:', minPrice, '-', maxPrice);
    
    await this.delay();

    const results = this.database.filter(comic => {
      const price = comic.prices[0]?.price || 0;
      return price >= minPrice && price <= maxPrice;
    });

    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total: total,
      offset: offset,
      limit: limit,
      count: paginatedResults.length
    };
  }

  // Obter estatísticas dos dados mockados
  getStats() {
    const totalComics = this.database.length;
    const avgPrice = this.database.reduce((sum, comic) => 
      sum + (comic.prices[0]?.price || 0), 0) / totalComics;
    
    const series = [...new Set(this.database.map(comic => comic.series.name))];
    
    return {
      totalComics,
      averagePrice: avgPrice.toFixed(2),
      uniqueSeries: series.length,
      seriesList: series
    };
  }
}

// Criar instância do cliente mockado
const mockClient = new MockMarvelClient();

// Exportar funções principais
export const fetchComics = (params) => mockClient.fetchComics(params);
export const fetchComicById = (id) => mockClient.fetchComicById(id);
export const fetchComicsBySeries = (series, params) => mockClient.fetchComicsBySeries(series, params);
export const fetchComicsByPriceRange = (min, max, params) => mockClient.fetchComicsByPriceRange(min, max, params);
export const getStats = () => mockClient.getStats();

export default mockClient;