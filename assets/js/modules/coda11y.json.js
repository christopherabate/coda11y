export default 
[
    {
        "title": "Images",
        "description": "Les images doivent avoir une alternative textuelle pertinente",
        "template": "<!doctype html><html><head><meta charset=\"utf-8\"></head><body>${html}</body></html>",
        "codes": [
            {
                "language": "html",
                "placeholder": "&lt;svg role=&quot;img&quot;&gt; [...] &lt;/svg&gt;",
                "answer": "&lt;svg role=&quot;img&quot; aria-label=&quot;alternative textuelle&quot;&gt; [...] &lt;/svg&gt;",
                "tests": [
                    {
                        "pattern": "alt",
                        "error": "L'attribut <code>alt</code> est le meilleur moyen de donner une alternative textuelle à une image."
                    },
                    {
                        "pattern": "aria-",
                        "error": "Les balises <code>&lt;svg&gt;</code> ne peuvent pas posséder un attribut <code>alt</code>."
                    }
                ]
            }
        ],
        "hints": [
            "Les balises <code>&lt;img&gt;</code> possèdent-elles un attribut <code>alt</code> ?",
            "Toutes les images contiennent du texte ou sont porteuses d'information ?",
            "Pour une balise <code>&lt;svg&gt;</code>, les attributs ARIA <code>aria-hidden</code>, <code>aria-label</code> ou <code>aria-labelledby</code> peuvent s'avérer utiles&hellip;"
        ]
    },
    {
        "title": "Cadres",
        "description": "Les cadres doivent avoir une alternative textuelle pertinente",
        "template": "<!doctype html><html><head><meta charset=\"utf-8\"><style>${css}</style></head><body>${html}<script type=\"module\">${js}</script></body></html>",
        "codes": [
            {
                "language": "html",
                "placeholder": "<p>Test CSS</p>",
                "answer": "ANSWER1",
                "tests": [
                    {
                        "pattern": "alt",
                        "error": "L'attribut <code>alt</code> est le meilleur moyen de donner une alternative textuelle à une image."
                    },
                    {
                        "pattern": "aria-",
                        "error": "Les balises <code>&lt;svg&gt;</code> ne peuvent pas posséder un attribut <code>alt</code>."
                    }
                ]
            },
            {
                "language": "css",
                "placeholder": ".class ",
                "answer": "ANSWER2",
                "tests": [
                    {
                        "pattern": "alt",
                        "error": "L'attribut <code>alt</code> est le meilleur moyen de donner une alternative textuelle à une image."
                    },
                    {
                        "pattern": "aria-",
                        "error": "Les balises <code>&lt;svg&gt;</code> ne peuvent pas posséder un attribut <code>alt</code>."
                    }
                ]
            },
            {
                "language": "js",
                "placeholder": "console.log('test');",
                "answer": "ANSWER3",
                "tests": [
                    {
                        "pattern": "alt",
                        "error": "L'attribut <code>alt</code> est le meilleur moyen de donner une alternative textuelle à une image."
                    },
                    {
                        "pattern": "aria-",
                        "error": "Les balises <code>&lt;svg&gt;</code> ne peuvent pas posséder un attribut <code>alt</code>."
                    }
                ]
            }
        ],
        "hints": [
            "Indice 1",
            "Indice 2"
        ]
    }
]