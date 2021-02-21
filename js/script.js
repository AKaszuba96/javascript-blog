'use strict';
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
    };

    // Generowanie listy tytułów

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list';

    
    const generateTitleLinks = function(customSelector = ''){

        console.log('Function is on!');

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        let html = '';
        console.log('customSelector: ', customSelector);
        console.log('Merge: ', optArticleSelector + customSelector);
        const articles = document.querySelectorAll(optArticleSelector + customSelector); // dodanie filtrowania
        
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
        addClickListenersToArticles();
    };

    // Wyświetlanie artykułów po kliknięciu cz.2
    function addClickListenersToArticles(){
        const links = document.querySelectorAll('.titles a');
        console.log(links);

        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
    // addClickListenersToArticles();

    // Generowanie tagów
    function generateTags(){
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = [];
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log('Tags articles: ', articles);

        /* START LOOP: for every article: */
        for (let article of articles){
      
            /* find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);

            /* make html variable with empty string */
            let html = '';
      
            /* get tags from data-tags attribute */
            const tagsList = article.getAttribute('data-tags');
            console.log('data-tags: ', tagsList);

            /* split tags into array */
            const tags = tagsList.split(' ');
            console.log('tags: ', tags);

            /* START LOOP: for each tag */
            for (let tag of tags){
      
                /* generate HTML of the link */
                const codeHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                console.log('HTML code: ', codeHTML);
      
                /* add generated code to html variable */
                html = html + codeHTML; 

                /* [NEW] check if this link is NOT already in allTags */
                if (allTags.indexOf(codeHTML) == -1){
                    /* [NEW] add generated code to allTags array */
                    allTags.push(codeHTML);
                }
      
            /* END LOOP: for each tag */
            }
      
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;

        /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector);

        /* [NEW] add html from allTags to tagList */
        tagList.innerHTML = allTags.join(' ');
    }
      
    generateTags();

    // Generowanie tagów - dodanie akcji po kliknięciu w tag
    function tagClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log('href: ', href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        console.log('tag: ', tag);

        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
      
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks){
            /* remove class active */
            activeTagLink.classList.remove('active');
            console.log('remove class: ', activeTagLink);
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href^="' + href + '"]');

        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks){
            /* add class active */
            tagLink.classList.add('active');
            console.log('add class: ', tagLink);
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags(){
        /* find all links to tags */
        const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
        console.log('tagsLinks: ', tagsLinks);

        /* START LOOP: for each link */
        for (let tagLink of tagsLinks){
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
        }
    }
      
    addClickListenersToTags();

    // Generowanie autorów

    function generateAuthors(){
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles){
      
            /* find author wrapper */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);
     
            /* get author from data-author attribute */
            const author = article.getAttribute('data-author');
            console.log('data-author: ', author);
      
            /* insert HTML of author link into the author wrapper */
            authorWrapper.innerHTML = '<a href="#author-' + author + '">by ' + author + '</a>';
        /* END LOOP: for every article: */
        }
    };
      
    generateAuthors();

    // Generowanie autorów - dodanie akcji po kliknięciu w link autora
    function authorClickHandler(event){
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "author" and extract author name from the "href" constant */
        const author = href.replace('#author-', '');

        /* find all author links with class active */
        const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
      
        /* START LOOP: for each active tag link */
        for (let activeAuthorLink of activeAuthorLinks){
            /* remove class active */
            activeAuthorLink.classList.remove('active');
        /* END LOOP: for each active tag link */
        }
        /* find all author links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll('a[href^="' + href + '"]');

        /* START LOOP: for each found tag link */
        for (let authorLink of authorLinks){
            /* add class active */
            authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors(){
        /* find all links to authors */
        const authorsLinks = document.querySelectorAll('a[href^="#author-"]');

        /* START LOOP: for each link */
        for (let authorLink of authorsLinks){
            /* add authorClickHandler as event listener for that link */
            authorLink.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
        }
    };
      
    addClickListenersToAuthors();

    
    
    

}