'use strict';
{
    /* Declaration of opt */
    const opt = {
        optArticleSelector: '.post',
        optTitleSelector: '.post-title',
        optTitleListSelector: '.titles',
        optArticleTagsSelector: '.post-tags .list',
        optArticleAuthorSelector: '.post-author',
        optTagsListSelector: '.tags.list',
        optCloudClassCount: 5,
        optCloudClassPrefix: 'tag-size-',
        optAuthorsListSelector: '.authors.list'
    };

    // Wyświetlanie artykułów po kliknięciu cz.1
    const titleClickHandler = function(event){
        /* zawsze to dadać przy funkcjach - handlerach - po kliknięciu */
        const clickedElement = this;

        // console.log('Link was clicked!');
        // console.log(event);

        event.preventDefault();

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        // console.log('clickedElement:', clickedElement); // console.log('clickedElement (with plus): ' + clickedElement);
        clickedElement.classList.add('active');
        
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleName = clickedElement.getAttribute('href');
        // console.log('Href attribute: ', articleName);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const clickedArticle = document.querySelector('.posts ' + articleName);
        // console.log('clickedArticle: ', clickedArticle);

        /* [DONE] add class 'active' to the correct article */
        clickedArticle.classList.add('active');
    };

    // Generowanie listy tytułów
   
    const generateTitleLinks = function(customSelector = ''){

        // console.log('Function is on!');

        /* remove contents of titleList */
        const titleList = document.querySelector(opt.optTitleListSelector);
        titleList.innerHTML = '';

        let html = '';
        // console.log('customSelector: ', customSelector);
        // console.log('Merge: ', optArticleSelector + customSelector);
        const articles = document.querySelectorAll(opt.optArticleSelector + customSelector); // dodanie filtrowania
        
        /* for each article */
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
            // console.log('articleId: ', articleId);
        
            /* find the title element and get the title from the title element */
            const articleTitle = article.querySelector(opt.optTitleSelector).innerHTML;
            // console.log('articleTitle: ', articleTitle);

            /* create HTML of the link */
            const codeHTML = '<li><a href="#' + articleId + '"><span>' +articleTitle + '</span></a></li>';
            // console.log('HTML code: ', codeHTML);

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
        // console.log(links);

        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
    // addClickListenersToArticles();

    /* [NEW] calculate Tags Parameters */
    function calculateTagsParams(tags){
        const tagsParams = {};
        const allParams = [];

        for (let tag in tags){
            allParams.push(tags[tag]);
        }
        console.log('aalParams: ', allParams);
        console.log(Math.min(...allParams));

        tagsParams['min'] = Math.min(...allParams);
        tagsParams['max'] = Math.max(...allParams);

        return tagsParams;
    }

    /* [NEW] calculate Tag Class */
    function calculateTagClass(count, params){
        
        const paramsDiff = params['max'] - params['min'];

        let classHTML = '';

        if (count <= paramsDiff*(1/opt.optCloudClassCount)) {
            classHTML = opt.optCloudClassPrefix + 1;
        } else if (count > paramsDiff*(1/opt.optCloudClassCount) && count <= paramsDiff*(2/opt.optCloudClassCount)){
            classHTML = opt.optCloudClassPrefix + 2;
        } else if (count > paramsDiff*(2/opt.optCloudClassCount) && count <= paramsDiff*(3/opt.optCloudClassCount)){
            classHTML = opt.optCloudClassPrefix + 3;
        } else if (count > paramsDiff*(3/opt.optCloudClassCount) && count <= paramsDiff*(4/opt.optCloudClassCount)){
            classHTML = opt.optCloudClassPrefix + 4;
        } else {
            classHTML = opt.optCloudClassPrefix + 5;
        }

        console.log(classHTML);
        return classHTML;
    }

    // Generowanie tagów
    function generateTags(){
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(opt.optArticleSelector);
        // console.log('Tags articles: ', articles);

        /* START LOOP: for every article: */
        for (let article of articles){
      
            /* find tags wrapper */
            const tagsWrapper = article.querySelector(opt.optArticleTagsSelector);

            /* make html variable with empty string */
            let html = '';
      
            /* get tags from data-tags attribute */
            const tagsList = article.getAttribute('data-tags');
            // console.log('data-tags: ', tagsList);

            /* split tags into array */
            const tags = tagsList.split(' ');
            // console.log('tags: ', tags);

            /* START LOOP: for each tag */
            for (let tag of tags){
      
                /* generate HTML of the link */
                const codeHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                // console.log('HTML code: ', codeHTML);
      
                /* add generated code to html variable */
                html = html + codeHTML; 

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]){ // negacja
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++; // zwiększa o jeden
                }
      
            /* END LOOP: for each tag */
            }
      
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;

        /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(opt.optTagsListSelector);

        /* [NEW] Finding extreme numbers of occurrences */
        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams)

        /* [NEW] create variable for all links HTML code */
        let allTagsHTML = '';

        /* [NEW] START LOOP: for each tag in allTags: */
        for(let tag in allTags){
            /* [NEW] generate code of a link and add it to allTagsHTML */
            allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>'; //' (' + allTags[tag] + ')</a></li>'
            /* [NEW] END LOOP: for each tag in allTags: */
        }
        /*[NEW] add HTML from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
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
        // console.log('href: ', href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        // console.log('tag: ', tag);

        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
      
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks){
            /* remove class active */
            activeTagLink.classList.remove('active');
            // console.log('remove class: ', activeTagLink);
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href^="' + href + '"]');

        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks){
            /* add class active */
            tagLink.classList.add('active');
            // console.log('add class: ', tagLink);
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags(){
        /* find all links to tags */
        const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
        // console.log('tagsLinks: ', tagsLinks);

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
        const articles = document.querySelectorAll(opt.optArticleSelector);

        /* [NEW] Create object with authors */
        let allAuthors = {};

        /* START LOOP: for every article: */
        for (let article of articles){
      
            /* find author wrapper */
            const authorWrapper = article.querySelector(opt.optArticleAuthorSelector);
     
            /* get author from data-author attribute */
            const author = article.getAttribute('data-author');
            // console.log('data-author: ', author);
      
            /* insert HTML of author link into the author wrapper */
            authorWrapper.innerHTML = '<a href="#author-' + author + '">by ' + author + '</a>';

            /* [NEW] Calculating the number of articles for a given author */
            if (!allAuthors[author]){
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            } 
        /* END LOOP: for every article: */
        }
        /* [NEW] find list of authors in right column */
        const authorList = document.querySelector(opt.optAuthorsListSelector);

        /* [NEW] GEnerate links of authors */
        let authorsHTML = '';

        for (let author in allAuthors){
            authorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>'
        }

        authorList.innerHTML = authorsHTML;
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