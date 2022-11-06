function extraiLinks(arrayLinks) {
    return arrayLinks.map((objetolink) => Object.values(objetolink).join());
}

async function checaStatus(listaURLs) {
    const arrayStatus = await Promise
    .all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch(erro) {
                return manejaErros(erro);
            }
        })
    )

    return arrayStatus;
}

function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    } else {
        return 'Ocorreu algum erro';
    }
}

export default async function listaValidada(listaDeLinks) {
    const links =  extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
       ...objeto,
       status: status[indice]
    }));
}
