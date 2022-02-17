const Client = require('pg').Client;
const cliente = new Client({
    user: "postgres",
    password: "afal1993",
    host: "127.0.0.1",
    port: 5432,
    database: "Carros"
})

// ------Maneira mais simples de se criar uma conexão com o banco -----------
/*cliente.connect();
cliente.query("select * from carros")
.then(results => {
    const resultado = results.rows
    console.log(resultado)
})
.finally(() => cliente.end());*/

//delCarros("HB20");

//getCarros();    <- descomentar para receber a lista completa do banco de dados

insertCarros("Hyundai", "HB20"); //<- descomentar para inserir carros na tabela



async function getCarros() {
try{
    console.log("Iniciando a conexão.");
    await cliente.connect();
    console.log("Conexão bem sucedida!");
    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
}
catch(ex){
    console.log("Ocorreu um erro no getCarros. Erro" + ex);
}
finally{
    await cliente.end();
    console.log("Cliente desconectado!");
}};

async function insertCarros(marca, modelo) {
    try{
        console.log("Iniciando a conexão.");
        await cliente.connect();
        console.log("Conexão bem sucedida!");
        await cliente.query('insert into carros("marca", "modelo") values (' + "'" + marca + "', '" + modelo + "');");
        console.log("Valor inserido na tabela!");

        const resultado = await cliente.query("select * from carros");
        console.table(resultado.rows);
    }
    catch(ex){
        console.log("Ocorreu um erro no insertCarros. Erro" + ex);
    }
    finally{
        await cliente.end();
        console.log("Cliente desconectado!");
    }};

    async function delCarros(modelo) {
        try{
            console.log("Iniciando a conexão.");
            await cliente.connect();
            console.log("Conexão bem sucedida!");
            await cliente.query("delete from carros where modelo = '" + modelo + "';");
            console.log("Valor removido da tabela!");
    
            const resultado = await cliente.query("select * from carros");
            console.table(resultado.rows);
        }
        catch(ex){
            console.log("Ocorreu um erro no insertCarros. Erro" + ex);
        }
        finally{
            await cliente.end();
            console.log("Cliente desconectado!");
        }};

    
