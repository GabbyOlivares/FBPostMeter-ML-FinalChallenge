#Fix wd

setwd("C:/Users/avalo/OneDrive/Documentos/tec_documentos_plataforma/facebook_work")

db <-read.csv("facebook_target.csv", header = T, stringsAsFactors = F)

#Lets filter by group

db_succes <- subset(db, db$Clus_km == 1)

#Lets see it distribution by type 

table(db_succes$Type)
table(db_succes$Category)
table(db$Paid)

columns <- colnames(db_succes)

#Lets take the non categorical columns
columns <- c("Page.total.likes","Post.Month", "Post.Weekday","Post.Hour", "LPost.Tot.Reach" , 
             "LPost.Tot.Impressions",  "Lifetime.Engaged.Users", "LPost.Consumers", "LPost.Consumptions",
             "LPost.Liked.Page.Impressions","LPost.Liked.Page.Reach", "LPeople.Post.Like...Engange", 
             "comment"  , "like"  , "share" )                     


final <- NULL

set.seed(124)

library(dplyr)

for(j in 1:20){
  aux <- sample_n(db_succes, 30)
  preliminar <- as.data.frame(1:30)
  for(i in 1:length(columns)){
    #i=1
   
    name <- columns[[i]]
    dmean <- mean(aux[,name])
    dstd <- sd(aux[,name])
    simula <- round(rnorm(30, dmean, dstd ))
    preliminar <- cbind.data.frame(preliminar, simula)
    colnames(preliminar)[i+1] = name
    
  }
final <-rbind.data.frame(final, preliminar)
}
#Lets remove negative values
summary(final)

for (name in columns) {
  print(name)
  final <- final[final[,name]>=0,]
  
}

summary(final)


preliminar <- final
#Number of observations

n = length(preliminar$Page.total.likes)

#Generemos 0 y 1 para pagado y no pagado
preliminar$Paid <- rbinom(n, size = 1, prob=21/56)

#Generemos las categorias 1,2,3
preliminar$Category <-sample(3, n, prob = c(17/56, 18/56, 21/56), replace = T)

#Generemos el tipo
preliminar$Type <- sample(3, n, prob=c(45/56, 7/56, 4/56), replace=T)

preliminar$Total.Interactions = preliminar$comment+ preliminar$like+preliminar$share
  
preliminar <- preliminar[,-c(1)]

nombres <- colnames(db_succes[,c(1:19)])

preliminar <- preliminar[,nombres]

#Reescribir photo=1, status = 2, Video 3
preliminar$Type <- factor(preliminar$Type, levels = c(1,2,3), labels = c("Photo", "Status", "Video"))


#Lets remove the succes and  add the cluster columns
db <- db[-c(20)]
preliminar$Clus_km =1

preliminar <- rbind.data.frame(db,preliminar)
write.csv(preliminar, file="facebook_mock.csv", row.names=F)

