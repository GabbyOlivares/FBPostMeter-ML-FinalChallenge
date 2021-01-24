#Fix wd
wd <- "C:/Users/avalo/OneDrive/Documentos/tec_documentos_plataforma/facebook_work"

#
setwd(wd)

#Read the csv
db <- read.csv("dataset_Facebook.csv", header=T, stringsAsFactors = F)#, sep = ";")

#Lets know our db through a statistical description
summary(db)

#Lets make some boxes
library(reshape2)

#Reshape df
df2 <- melt(db, id.vars = c("Page.total.likes","Type", "Category", "Post.Month",
                            "Post.Weekday", "Post.Hour", "comment", "like","share",                                                              
                            "Total.Interactions"))

#Make bp
library(ggplot2)

ggplot(df2, aes(x=Type, value, color=variable))+
  geom_boxplot()+
  facet_wrap(variable~., scales="free_y")

#Lets see the data distribution for categorical variables
table(db$Type)

table(db$Category)

table(db$Type, db$Category)

table(db$Paid)

#df3
df3 <- melt(db, id.vars = colnames(db[,-c(2,3,7)]))

ggplot(df3, aes(x=value))+
  geom_histogram(stat="count")+
  facet_wrap(variable~.)

#Gráfica de correlacion
pairs(db[,c(1,16,17,18,19)])

#Success rate
db$rate <- db$Total.Interactions/db$Page.total.likes

ggplot(db, aes(y=rate))+
  geom_boxplot()
