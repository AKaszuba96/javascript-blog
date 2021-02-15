'use strict'
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
{
    // Wyświetlanie artykułów po kliknięciu cz.1
    const titleClickHandler = function(event){
        /* zawsze to dadać przy funkcjach - handlerach - po kliknięciu */
        const clickedElement = this;

        console.log('Link was clicked!');
        console.log(event);

        event.preventDefault();

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement); // console.log('clickedElement (with plus): ' + clickedElement);
        clickedElement.classList.add('active');
        
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleName = clickedElement.getAttribute('href');
        console.log('Href attribute: ', articleName);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const clickedArticle = document.querySelector('.posts ' + articleName);
        console.log('clickedArticle: ', clickedArticle);

        /* [DONE] add class 'active' to the correct article */
        clickedArticle.classList.add('active');
    }

    // Generowanie listy tytułów

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    
    function generateTitleLinks(){

        console.log('Function is on!');

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        let html = '';
        const articles = document.querySelectorAll(optArticleSelector);
        
        /* for each article */
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
            console.log('articleId: ', articleId);
        
            /* find the title element and get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log('articleTitle: ', articleTitle);

            /* create HTML of the link */
            const codeHTML = '<li><a href="#' + articleId + '"><span>' +articleTitle + '</span></a></li>';
            console.log('HTML code: ', codeHTML);

            /* insert link into titleList */
            // titleList.innerHTML = titleList.innerHTML + codeHTML;
            // titleList.insertAdjacentHTML('beforeend', codeHTML);
            html = html + codeHTML;
        }

        titleList.innerHTML = html;
    }
      
    generateTitleLinks();

    // Wyświetlanie artykułów po kliknięciu cz.2
    const links = document.querySelectorAll('.titles a');
    console.log(links)

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

}