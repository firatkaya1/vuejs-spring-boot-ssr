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
|   ├── src/main/resource/template 
├── .gradle
├── build
├── README.md
├── package.json
└── .gitignore
```








 
