# vuejs-spring-boot-ssr

#### Nedir ? 

Bu repository Java ve Javascript dillerinde bulunan Spring Boot ve VueJS frameworklerini server-side rendering konusunda 
geliştirdiği çözümü göstermekte ve bunu bir template olarak sunmaktadır. 

#### Problem neydi?

1. Modern JavaScript frameworkleri ile çözemediğimiz bazı durumlar bulunuyordu. Bu frameworkler (React, Vue, Angular) bütün JavaScriptleri client tarafında yüklendikten sonra işlevsel hale gelmesi, yavaş internete sahip kullanıcılarda hatalar meydana getirmekteydi.

2. İki farklı production buildi oluşturmak aynı zamanda süreçleri biraz daha karmaşık hale getiriyordu. Bunun için basit çözümler geliştirsek dahi yine elimizde 2 farklı build oluşması(front-end tarafından oluşan build ve backend tarafında oluşan build) işleri bir tık uzatıyordu. 

3. SEO : Bazı uygulamarımızda SEO bizler için çok önemli bir konuydu. Bu frameworkler SEO açısından problemlerimizi çözmemektedir. Sosyal medyaya verilen linkler, arama motorlarındaki sıralamalarda geri kalmaktadır. 

#### Dezavantajları var mıdır ? 

Evet, bu template oldukça basit bir bakış açısı sunmaktadır. Biraz daha aşağılarda size süreçi daha detaylı anlatma fırsatı bulacağım.  Daha da geliştikçe dezavantajların neler olduğunu görebileceksiniz. 

Farklı kütüphaneleri kullanmak istediğinizde bunun için webpack aracılığıyla ellemeniz ve düzeltme gereği duyabilirsiniz. Benim webpack configim daha çok Javascript üzerine kuruludur. Sizler typescript için yapmak isterseniz bir tık daha değişiklik yapmanız gerekecektir. 

Bandwidth : Bir kere cachelenmiş bütün JavaScript uygulaması size bandwidth kazandırırken, server-side uygulamalarda bunu bir tık kaybedebilirsiniz. 

#### Nasıl çalışır? 

Basit bir Spring boot uygulaması geliştirdiğimizde oldukça basit bir file structure sahip olduğunu biliriz. 


```bash
├── backend-app
│   ├── src/main/java 
|   |   ├──packageA/controller
|   |   ├──packageA/repository
|   |   ├──packageA/service 
|   |
|   ├── src/main/resource/template 
|   |   ├── home/index.html
|   |   ├── login/index.html
│   │   ├── about/index.html
|   ├── src/main/resource/static 
|   |   ├── css/
|   |   |   ├── home.css
|   |   |   ├── login.css
|   |   |   ├── about.css
|   |   ├── fonts/
|   |   |   ├── fontA/fontA-fonts
|   |   |   ├── fontB/fontB-fonts
|   |   ├── js/
|   |   |   ├── home/home.bundle.js
|   |   |   ├── login/login.bundle.js
|   |   |   ├── about/about.bundle.js
|   |   ├── images/
├── .gradle
├── build
```

Arayüz projesinin file structure'da aşağıdaki gibidir. 



```bash
├── src
│   ├── pages
│   │   ├── home
│   │   |   ├── App.vue
│   │   |   ├── main.js
│   │   ├── about
│   │   |   ├── App.vue
│   │   |   ├── main.js
│   │   ├── login
│   │   |   ├── App.vue
│   │   |   ├── main.js
├── dist (or build)
├── public (or build)
├── node_modules
```



Fark edebildiğiniz gibi Single Page Application(SPA) uygulamarında sadece tek bir root component bulunur. Fakat bizim elimizde her sayfa için bir App.vue dosyamız bulunmaktadır. Bunun nedeni her sayfa için yeni bir Vue instance'i tanıtmış olmamızdır. 


Proje için ui/ dosyasının altında bir webpack.config.js dosyası bulunmaktadır. Bu dosya aracılığıyla başlangıç noktasını verdiğimiz sayfaları dolaşıp bunları birer Javascript bundle haline getirmekte ve bunları da spring boot uygulamasında bulunan **static/** klasörünün altına eklemektedir.

 Basit bir template ile spring boot tarafında bir sayfayı nasıl render edebileceğinizi aşağıdaki şekilde bulabilirsiniz. 

**HomeController.java**
```java
@Controller
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class HomeController {

    private final ArticleRepository articleRepository;

    @GetMapping(value = {"/","/home"})
    public String home(Model model) {
        model.addAttribute("props", Map.of("articles",articleRepository.findAll()));
        return "home/index.html";
    }
```

**templates/home/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home 1212</title>

    <link rel="stylesheet"  data-th-href="@{/css/home.bundle.css}">

    <script defer data-th-src="@{/js/home/home.bundle.js}"></script>
    <script defer data-th-src="@{/js/shared/shared.bundle.js}"></script>
    <script defer data-th-src="@{/js/vendors/vendors.bundle.js}"></script>
</head>
<body>
    <div id="app">

    </div>
   <script defer async th:inline="javascript">
     PageComponent = /*[[(${props})]]*/ {}
   </script>
</body>
</html>
```
Burada aynı zamanda server-side tarafından JS vermek istediğiniz verileri de aktarım yapabilirsiniz. Ben burada elimde bulunan articles isimli listeyi vermek istedim. VueJS tarafında bu listeyi almak ve listelemek istediğinizde aşağıdaki gibi bir formatı takip edebilirsiniz. 

**main.js** 
```js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App,PageComponent)
.mount("#app");
```


**App.vue** 
```vue
<template>
  <main class="container">
    {{articles}}
  </main>

</template>

<script>
import Footer from '../..//shared/components/Footer.vue';
import Menu from '../../shared/components/Menu.vue';

export default {
  name: "Home",
  components: {  Menu, Footer },
   props: {
    articles:Array
   },
};
</script>

```

İşte bu kadar. Bu sayede sayfa yüklenirken tekrar bir istek atmadan gerekli data ile birlikte sayfayı daha hızlı yüklenebilir hale getirebiliriz. 






