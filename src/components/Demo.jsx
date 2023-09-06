import { useState, useEffect } from 'react';

import { copy, linkIcon, tick, loader } from '../assets';
import { useLazyGetSummeryQuery } from '../services/article';

function Demo() {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [getSummery, { error, isLoading }] = useLazyGetSummeryQuery();

  console.log(allArticles);

  useEffect(function () {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  async function hanldeSubmit(e) {
    e.preventDefault();

    const { data } = await getSummery({
      articleUrl: article.url,
    });

    console.log(data);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
  }

  function handleCopy(copyUrl) {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => {
      setCopied('false');
    }, 3000);
  }

  return (
    <section className="mt-16 w-full max-w-xl ">
      {/* search */}
      <div className=" flex flex-col gap-2 w-full">
        <form
          className="relative flex justify-center items-center"
          onSubmit={(e) => hanldeSubmit(e)}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="text"
            placeholder="Enter your URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            className="url_input peer"
          />
          <button
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            type="submit"
          >
            ↩
          </button>
        </form>
        {/* Browser URL */}
        <div className="flex flex-col gap-1 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="w-[40%] h-[40%] object-contain "
                />
              </div>
              <p className="flex-1 text-blue-700 font-satoshi font-mediumn text-sm truncate ">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 flex justify-center items-center max-w-full">
        {isLoading && (
          <img
            src={loader}
            alt="loader_icon"
            className="w-20 h-20 object-contain"
          />
        )}
        {error && !isLoading && (
          <p className="font-inter font-bold text-black text-center ">
            well that, wasn't supposed to happen...
            <br />
            <span className="text-gray-500 font-satoshi font-normal">
              {error?.data?.error}
            </span>
          </p>
        )}
        {!isLoading && !error && article.summary && (
          <div className="flex flex-col gap-3">
            <h2 className=" font-satoshi font-bold text-gray-600 text-xl ">
              Article <span className="blue_gradient">Summary</span>
            </h2>
            <div className="summary_box">
              <p className=" font-inter font-medium text-sm text-gray-700 ">
                {article.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Demo;
