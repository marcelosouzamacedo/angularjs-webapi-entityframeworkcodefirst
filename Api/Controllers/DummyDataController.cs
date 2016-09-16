using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Api.Models;

namespace Api.Controllers
{
    public class DummyDataController : ApiController
    {
        [HttpGet]
        public void CreateDummyData()
        {
            using (var ctx = new ShoppingCartContext())
            {
                var moda = new Category() { Name = "moda" };
                ctx.Categories.Add(moda);

                var bolsaFotografica = new Product()
                {
                    Name = "Bolsa Fotográfica Sx50 P/ Câmeras Profissionais E Semi",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/item/13366/3/13366319G1.jpg",
                    Info = @"Bolsa Com Ótimo Acabamento Em Couro Sintético E Parte Interna Acochoada. É A Prova Dágua Para Maior Proteção Do Equipamento. Acompanha Uma Alça Para Facilidade No Transporte. Com Bolso Externo Na Parte Frontal. Ziperes Duplos Abrem Para Os Dois Lados.",
                    Price = 33.90m
                };
                ctx.Products.Add(bolsaFotografica);
                var chapeuFloppyPreto = new Product()
                {
                    Name = "Chapéu Floppy Preto",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/9928/6/9928696G1.jpg",
                    Info = @"Características Chapéu Grande, No Modelo Floppy, Em Feltro Na Cor Preta.",
                    Price = 119.90m
                };
                ctx.Products.Add(chapeuFloppyPreto);
                var gorro = new Product()
                {
                    Name = "Gorro Gamulã Em Lã Natural (Unissex)",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/9428/5/9428507G1.jpg",
                    Info = @"Desenvolvido 100 em lã natural de carneiro e com tratamento impermeabilizante, o Gorro Gamulã Fiero proporciona alta durabilidade e o isolamento térmico ideal para lugares de frio intenso e neve.",
                    Price = 142.50m
                };
                ctx.Products.Add(gorro);
                var chapeuFloppyRosa = new Product()
                {
                    Name = "Chapéu Floppy Rosa",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/9928/6/9928604G1.jpg",
                    Info = @"Chapéu Grande, No Modelo Floppy, Em Feltro Na Cor Rosa.",
                    Price = 159.00m
                };
                ctx.Products.Add(chapeuFloppyRosa);
                var feminino = new Category() { Name = "feminino", Parent = moda, Products = new[] { bolsaFotografica, chapeuFloppyPreto, gorro, chapeuFloppyRosa } };
                ctx.Categories.Add(feminino);

                var capaGame = new Product()
                {
                    Name = "Capa Game Psp Ds Emborrachado Preto E Azul Aztec",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/8315/9/8315972G1.jpg",
                    Info = @"Capa Game Protetora (Case) Psp 2000/3000 Ou Nintendo Ds/Dsi",
                    Price = 12.90m
                };
                ctx.Products.Add(capaGame);
                var bolsaEvoc = new Product()
                {
                    Name = "Bolsa Evoc Courier",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/11450/8/11450832G1.jpg",
                    Info = @"Bolsa Estilo Escritório Espaçosa E Construída Para Uso Pesado.",
                    Price = 549.00m
                };
                ctx.Products.Add(capaGame);
                var caseParaNotebook = new Product()
                {
                    Name = "Case Para Notebook Sestini Arapongas 12",
                    ImageUrl = "http://images.americanas.io/produtos/01/00/sku/13546/4/13546437G1.jpg",
                    Info = @"O Case Para Notebook Sestini Arapongas 12 É Desenvolvido Em Neopreme Que É Composto De Borracha Que Oferece Excelente Proteção. O Case Para Notebook Sestini Arapongas 12  É Perfeito Para Agregar Segurança E Estilo. Dimensão : Para Laptop 12.",
                    Price = 41.88m
                };
                ctx.Products.Add(capaGame);
                var masculino = new Category() { Name = "masculino", Parent = moda, Products = new[] { capaGame, bolsaEvoc, caseParaNotebook } };
                ctx.Categories.Add(masculino);

                var beleza = new Category() { Name = "beleza" };
                ctx.Categories.Add(beleza);

                var prancha = new Product()
                {
                    Name = "Prancha Nano Titanium Babyliss Pro Tradicional 11/4",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/sku/8082/9/8082901G1.jpg",
                    Info = @"A Prancha Babyliss Conta Com As Mais Recentes Tecnologias, Como A Tecnologia Nano Titanium.",
                    Price = 328.90m
                };
                ctx.Products.Add(prancha);
                var taiff = new Product()
                {
                    Name = "Chapinha (prancha) Taiff Alisadora Red Íon - Bivolt",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/item/5057/6/5057659G1.jpg",
                    Info = @"Que tal contar com toda a versatilidade da tecnologia Taiff numa chapa leve, compacta e com design moderno?",
                    Price = 89.99m
                };
                ctx.Products.Add(taiff);
                var ga = new Product()
                {
                    Name = "Chapinha (prancha) GA.MA Italy Ceramic Infrared",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/item/361/3/361356G1.jpg",
                    Info = @"Prancha para cabelos que emite ondas infravermelhas longas e íons que agem de dentro para fora protegendo a saúde dos cabelos, deixando-os com mais brilho e alisados por mais tempo que as pranchas comuns.",
                    Price = 79.99m
                };
                ctx.Products.Add(ga);
                var chapinhas = new Category() { Name = "chapinhas e pranchas", Parent = beleza, Products = new[] { prancha, taiff, ga } };
                ctx.Categories.Add(chapinhas);
                
                var aparador = new Product()
                {
                    Name = "Aparador de Pelos Philips Multigroom Series 3000 QG3340/16 com Acessórios",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/item/112941/0/112941067G1.jpg",
                    Info = @"Para você que procura estilo perfeito e facilidade de criar, a Philips traz o Multigroom Series 3000 QG3340/16 com aparador de detalhes de alto desempenho, minibarbeador, pentes para barba com até 18 ajustes e aparador de pelos do nariz.",
                    Price = 119.99m
                };
                ctx.Products.Add(aparador);
                var barbeador = new Product()
                {
                    Name = "Barbeador Philips AquaTouch Plus AT891/14",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/item/7494/8/7494878G1.jpg",
                    Info = @"Agora barbear-se ficou mais fácil, suave e não irrita a pele.",
                    Price = 199.99m
                };
                ctx.Products.Add(barbeador);
                var kit = new Product()
                {
                    Name = "Kit Aparador de Pelos Philips Multigroom QG3339/15 Bateria Recarregável 12W",
                    ImageUrl = "http://imagens.americanas.com.br/produtos/01/00/item/119371/0/119371001G1.png",
                    Info = @"O Philips Multigroom QG3339/15 é um aparador de pelos à prova d'água com multifunções. Compacto, também permite que você o carregue para qualquer lugar, mantendo-se sempre com aparência impecável.",
                    Price = 119.99m
                };
                ctx.Products.Add(kit);
                var barbeadores = new Category() { Name = "barbeadores", Parent = beleza, Products = new[] { aparador, barbeador, kit } };
                ctx.Categories.Add(barbeadores);
          
                ctx.SaveChanges();
            }
        }
    }
}
