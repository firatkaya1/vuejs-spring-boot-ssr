# vuejs-spring-boot-ssr

Nedir ? 

Bu repository Java ve Javascript dillerinde bulunan Spring Boot ve VueJS frameworklerini server-side rendering konusunda 
geliştirdiği çözümü göstermekte ve bunu bir template olarak sunmaktadır. 


Problem ?

Modern JavaScript frameworklerinde çözmek istediğimiz ve karşılaştığımız problemler aşağıdadır. 

SEO : Javascript tarafından render edilen, browser'a ait olan routure işlemini tamamen frameworke bırakılmasından dolayı arama motorları sayfaları göremiyor
ve internet sitelerinin sıralamalarına büyük bir dezavantaj sağlamaktadır. 

Build : Günün sonunda 2 farklı projede çalışırken build almak istediğimizde front-end'in ve backend'in buildlerinin olması süreçleri uzatmaktadır. Aşağıdaki 
yöntem sayesinde sadece tek bir build oluşturmaktadır. 

Güvenlik : Javascript uygulamalarını build aldığımızda büyük miktarlarda .JS dosyaları oluşmaktadır. Problemlerimiz Lazy loading gibi durumlarda biraz daha 
hafifletilebilse dahi, yeterince küçülmemekte, browser farklılıklarından doğan geç yüklenmeler de beraberinde sorunlar oluşturmaktadır. 

Nasıl Çalışır ? 

Bildiğiniz üzere basit bir VueJS uygulamasını build aldığımızda ortaya sadece bir adet index.html ve yanında da birden fazla .JS uzantılı dosyalar 
oluşmaktadır. 
