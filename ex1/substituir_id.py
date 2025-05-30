
import sys
import json

def substituir_id_por__id(obj):
    if isinstance(obj, dict):
        novo_dict = {}
        for chave, valor in obj.items():
            nova_chave = "_id" if chave == "id" else chave
            novo_dict[nova_chave] = substituir_id_por__id(valor)
        return novo_dict
    elif isinstance(obj, list):
        return [substituir_id_por__id(item) for item in obj]
    else:
        return obj

def processar_ficheiro(ficheiro_entrada):
    with open(ficheiro_entrada, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    dados_transformados = substituir_id_por__id(dados)

    ficheiro_saida = "id2_id_" + ficheiro_entrada
    with open(ficheiro_saida, 'w', encoding='utf-8') as f:
        json.dump(dados_transformados, f, indent=2, ensure_ascii=False)

    print(f"Ficheiro guardado como: {ficheiro_saida}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python substituir_id.py <ficheiro.json>")
        sys.exit(1)

    ficheiro = sys.argv[1]
    processar_ficheiro(ficheiro)
