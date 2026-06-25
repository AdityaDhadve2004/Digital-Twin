export default function UserInfo(prop) {
    return (
        <div className="bg-white rounded-lg shadow-md p-8 mb-10 max-w-6xl mx-auto">
            <div className="flex items-start gap-6">
                {/* User Details Section */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome, {prop.user.data?.name || 'User'}
                    </h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        
                        {/* Email */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Email</p>
                            <p className="text-gray-800 font-medium break-all">
                                {prop.user.data?.email || 'Not provided'}
                            </p>
                        </div>
                        {/* Member Since */}
                        <div className="bg-orange-100 p-4 rounded-lg border border-black-200">
                            <p className="text-xs text-green-600 font-semibold uppercase mb-2">Member Since</p>
                            <p className="text-gray-800 font-medium">
                                {prop.user.data?.created_at ? new Date(prop.user.data.created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}