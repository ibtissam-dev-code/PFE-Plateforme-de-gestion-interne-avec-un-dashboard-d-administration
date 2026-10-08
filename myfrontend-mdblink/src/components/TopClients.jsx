// حيدنا const clients باش نوليو نصفطوهم كـ props من الصفحة
function TopClients({ clients = [] }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Top Clients
      </h2>

      <div className="space-y-5">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-2xl transition"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {/* رديناها nom بلاصة name باش تطابق Laravel */}
                  {client.nom}
                </h3>

                <p className="text-gray-500 text-sm">
                  {client.projets_count || client.projects?.length || 0} projects
                </p>
              </div>

              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-xl font-bold">
                {client.projets_count || client.projects?.length || 0}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">Aucun client pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default TopClients;