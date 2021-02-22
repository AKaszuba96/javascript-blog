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

    /* [NEW] templates - Handlebars */
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        articleLinkAuthor: Handlebars.compile(document.querySelector('#template-article-link-author').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-article-link-tag-cloud').innerHTML),
        articleLinkAuthorsList: Handlebars.compile(document.querySelector('#template-article-link-authors-list').innerHTML)
      };

    // Wyświetlanie artykułów po kliknięciu cz.1
    const titleClickHandler = function(event){
        /* zawsze to dadać przy funkcjach - handlerach - po kliknięciu */
        const clickedElement = this;
        event.preventDefault();

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleName = clickedElement.getAttribute('href');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const clickedArticle = document.querySelector('.posts ' + articleName);

        /* [DONE] add class 'active' to the correct article */
        clickedArticle.classList.add('active');
    };

    // Generowanie listy tytułów
   
    const generateTitleLinks = function(customSelector = ''){

        /* remove contents of titleList */
        const titleList = document.querySelector(opt.optTitleListSelector);
        titleList.innerHTML = '';

        let html = '';
        const articles = document.querySelectorAll(opt.optArticleSelector + customSelector); // dodanie filtrowania
        
        /* for each article */
        for(let article of articles){
            /* get the article id */
            const articleId = article.getAttribute('id');
        
            /* find the title element and get the title from the title element */
            const articleTitle = article.querySelector(opt.optTitleSelector).innerHTML;

            /* [NEW] create HTML of the link using templates */
            const codeHTMLData = {id: articleId, title: articleTitle};
            const codeHTML = templates.articleLink(codeHTMLData);

            /* insert link into titleList */
            html = html + codeHTML;
        }

        titleList.innerHTML = html;
        addClickListenersToArticles();
    };

    // Wyświetlanie artykułów po kliknięciu cz.2
    function addClickListenersToArticles(){
        const links = document.querySelectorAll('.titles a');

        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    /* [NEW] calculate Tags Parameters */
    function calculateTagsParams(tags){
        const tagsParams = {};
        const allParams = [];

        for (let tag in tags){
            allParams.push(tags[tag]);
        }

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

        return classHTML;
    }

    // Generowanie tagów
    function generateTags(){
        /* [NEW] create a new variable allTags with an empty object */
        const allTags = {};
        /* find all articles */
        const articles = document.querySelectorAll(opt.optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles){
      
            /* find tags wrapper */
            const tagsWrapper = article.querySelector(opt.optArticleTagsSelector);

            /* make html variable with empty string */
            let html = '';
      
            /* get tags from data-tags attribute */
            const tagsList = article.getAttribute('data-tags');

            /* split tags into array */
            const tags = tagsList.split(' ');

            /* START LOOP: for each tag */
            for (let tag of tags){
      
                /* [NEW] generate HTML of the link using templates */
                const codeHTMLData = {id: "tag-" + tag, title: tag};
                const codeHTML = templates.articleLink(codeHTMLData);
      
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

        /* [NEW] create object of data for all links HTML code */
        const allTagsData = {tags: []};

        /* [NEW] START LOOP: for each tag in allTags: */
        for(let tag in allTags){
            /* [NEW] add object to allTagsData */
            allTagsData.tags.push({
                id: 'tag-' + tag,
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
            /* [NEW] END LOOP: for each tag in allTags: */
        }
        /*[NEW] add HTML to tagList using template */
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
      
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks){
            /* remove class active */
            activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href^="' + href + '"]');

        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks){
            /* add class active */
            tagLink.classList.add('active');
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
      
            /* [NEW] insert HTML of author link into the author wrapper using templates */
            const codeHTMLData = {id: 'author-' + author, title: 'by ' + author};
            const codeHTML = templates.articleLinkAuthor(codeHTMLData);
            authorWrapper.innerHTML = codeHTML;

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
        const allAuthorsData = {authors: []};

        for (let author in allAuthors){
            allAuthorsData.authors.push({
                id: 'author-' + author,
                author: author,
                count: allAuthors[author]
            });
        }

        authorList.innerHTML = templates.articleLinkAuthorsList(allAuthorsData);
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