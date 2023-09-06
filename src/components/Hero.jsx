import logo from '../assets/logo.svg';

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28" />
        <button
          className="black_btn"
          onClick={() =>
            window.open(
              'https://github.com/sanketCy/Article_summarizer_with_OpenAi'
            )
          }
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Your Article With <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
}

export default Hero;
