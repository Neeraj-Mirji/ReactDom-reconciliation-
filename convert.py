import sys
import networkx as nx
from lxml import html
import matplotlib.pyplot as plt
from networkx.drawing.nx_agraph import graphviz_layout


htmlContent = sys.argv[1]
# print(htmlContent)
raw = htmlContent



def traverse(parent, graph, labels, G_edges, G_nodes):
    labels[parent] = parent.tag
    G_nodes.append(parent.tag);
    for node in parent.getchildren():
        graph.add_edge(parent, node)
        G_edges.append([parent.tag, node.tag])
        traverse(node, graph, labels, G_edges, G_nodes)

G = nx.Graph()
G_nodes = []
G_edges = []
labels = {}     # needed to map from node to tag
html_tag = html.document_fromstring(raw)
traverse(html_tag, G, labels, G_edges, G_nodes)


pos = graphviz_layout(G, prog='dot')

label_props = {'size': 16,
               'color': 'black',
               'weight': 'bold',
               'horizontalalignment': 'center',
               'verticalalignment': 'center',
               'clip_on': True}
bbox_props = {'boxstyle': "round, pad=0.2",
              'fc': "grey",
              'ec': "b",
              'lw': 1.5}

nx.draw_networkx_edges(G, pos, arrows=True)
ax = plt.gca()

for node, label in labels.items():
        x, y = pos[node]
        ax.text(x, y, label,
                bbox=bbox_props,
                **label_props)

ax.xaxis.set_visible(False)
ax.yaxis.set_visible(False)
plt.savefig("./public/images/output.jpg")
plt.show()

# print(G_edges)
# print(G_nodes)
